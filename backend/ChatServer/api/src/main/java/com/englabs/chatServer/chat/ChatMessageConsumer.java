package com.englabs.chatServer.chat;

import com.englabs.chatServer.conversation.dto.event.ChatMessageEvent;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.BackOff;
import org.springframework.kafka.annotation.DltHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
public class ChatMessageConsumer {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessagePersistenceService messagePersistenceService;
    private final ObservationRegistry observationRegistry;

    private final Counter messagesProcessed;
    private final Counter messagesFailed;
    private final Timer messageProcessingTime;

    public ChatMessageConsumer(
            SimpMessagingTemplate simpMessagingTemplate,
            MessagePersistenceService messagePersistenceService,
            ObservationRegistry observationRegistry,
            MeterRegistry meterRegistry
    ) {
        this.messagingTemplate = simpMessagingTemplate;
        this.messagePersistenceService = messagePersistenceService;
        this.observationRegistry = observationRegistry;

        this.messagesProcessed = Counter.builder("canto.messages.processed")
                .description("Total number of successfully processed messages")
                .register(meterRegistry);

        this.messagesFailed = Counter.builder("canto.messages.failed")
                .description("Total number of failed message processing attempts")
                .register(meterRegistry);

        this.messageProcessingTime = Timer.builder("canto.message.processing.time")
                .description("Time spent processing a chat message")
                .register(meterRegistry);
    }

    @RetryableTopic(
            attempts = "4",
            backOff = @BackOff(
                    delay = 1000,
                    multiplier = 2.0
            )
    )
    @KafkaListener(
            topics = "chat.messages",
            groupId = "canto-chat"
    )
    public void consume(ChatMessageEvent event) {
        Timer.Sample sample = Timer.start();

        try {
            log.info("Kafka consumed message: {}", event.messageId());

            Observation.createNotStarted(
                    "canto.chat.process",
                    observationRegistry
            ).observe(() -> {
                // create new message key
                MessageKey messageKey = new MessageKey(
                        event.conversationId(),
                        event.timestamp(),
                        UUID.fromString(event.messageId())
                );

                // create new message
                Message message = new Message(
                        messageKey,
                        UUID.fromString(event.senderId()),
                        event.content(),
                        event.timestamp()
                );

                messagePersistenceService.persist(message);    // save message
                messagingTemplate.convertAndSend("/topic/conversations/" + event.conversationId(), event);
            });

            messagesProcessed.increment();
        } catch (Exception e) {
            messagesFailed.increment();

            throw e;
        } finally {
            sample.stop(messageProcessingTime);
        }
    }

    @DltHandler
    public void handleDlt(ChatMessageEvent event) {
        log.info("Message permanently failed and was moved to DLT: {}", event.messageId());
    }
}

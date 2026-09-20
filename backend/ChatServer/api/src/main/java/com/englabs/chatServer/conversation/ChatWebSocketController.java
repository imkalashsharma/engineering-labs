package com.englabs.chatServer.conversation;

import com.englabs.chatServer.chat.ChatMessageProducer;
import com.englabs.chatServer.conversation.dto.event.ChatMessageEvent;
import com.englabs.chatServer.conversation.dto.request.ChatMessage;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.util.UUID;

@Controller
public class ChatWebSocketController {
    private final ChatMessageProducer messageProducer;
    private final ObservationRegistry observationRegistry;

    public ChatWebSocketController(ChatMessageProducer messageProducer, ObservationRegistry observationRegistry) {
        this.messageProducer = messageProducer;
        this.observationRegistry = observationRegistry;
    }

    @MessageMapping("/conversations/{conversationId}/messages")
    public void sendMessage(
            @DestinationVariable String conversationId,
            ChatMessage message
    ) {
        Observation.createNotStarted("canto.chat.send", observationRegistry)
                .observe(() -> {
                            ChatMessageEvent messageEvent = new ChatMessageEvent(
                                    UUID.randomUUID().toString(),
                                    message.conversationId(),
                                    message.senderId(),
                                    message.content(),
                                    Instant.now()
                            );

                            messageProducer.publish(messageEvent);
                        });

    }
}

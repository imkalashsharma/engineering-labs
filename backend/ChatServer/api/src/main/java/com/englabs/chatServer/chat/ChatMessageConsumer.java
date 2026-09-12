package com.englabs.chatServer.chat;

import com.englabs.chatServer.conversation.dto.event.ChatMessageEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
public class ChatMessageConsumer {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageRepository messageRepository;

    public ChatMessageConsumer(SimpMessagingTemplate simpMessagingTemplate, MessageRepository messageRepository) {
        this.messagingTemplate = simpMessagingTemplate;
        this.messageRepository = messageRepository;
    }

    @KafkaListener(
            topics = "chat.messages",
            groupId = "canto-chat"
    )
    public void consume(ChatMessageEvent event) {
        log.info("Kafka consumed message: {}.", event.messageId());

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

        messageRepository.save(message);    // save message

        messagingTemplate.convertAndSend("/topic/conversations/" + event.conversationId(), event);
    }
}

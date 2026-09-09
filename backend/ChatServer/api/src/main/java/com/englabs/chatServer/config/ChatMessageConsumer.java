package com.englabs.chatServer.config;

import com.englabs.chatServer.conversation.dto.event.ChatMessageEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ChatMessageConsumer {
    private final SimpMessagingTemplate messagingTemplate;

    public ChatMessageConsumer(SimpMessagingTemplate simpMessagingTemplate) {
        this.messagingTemplate = simpMessagingTemplate;
    }

    @KafkaListener(
            topics = "chat.messages",
            groupId = "canto-chat"
    )
    public void consume(ChatMessageEvent event) {
        log.info("Kafka consumed message: {}.", event.messageId());

        messagingTemplate.convertAndSend("/topic/conversations/" + event.conversationId(), event);
    }
}

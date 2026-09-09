package com.englabs.chatServer.config;

import com.englabs.chatServer.conversation.dto.event.ChatMessageEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageProducer {
    private static final String TOPIC = "chat.messages";

    private final KafkaTemplate<String, ChatMessageEvent> kafkaTemplate;

    public ChatMessageProducer(KafkaTemplate<String, ChatMessageEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publish(ChatMessageEvent event) {
        kafkaTemplate.send(
                TOPIC,
                event.conversationId(),
                event
        );
    }
}

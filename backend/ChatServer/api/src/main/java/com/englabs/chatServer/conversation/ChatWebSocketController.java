package com.englabs.chatServer.conversation;

import com.englabs.chatServer.config.ChatMessageProducer;
import com.englabs.chatServer.conversation.dto.event.ChatMessageEvent;
import com.englabs.chatServer.conversation.dto.request.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.util.UUID;

@Controller
public class ChatWebSocketController {
    private final ChatMessageProducer messageProducer;

    public ChatWebSocketController(ChatMessageProducer messageProducer) {
        this.messageProducer = messageProducer;
    }

    @MessageMapping("/conversations/{conversationId}/messages")
    public void sendMessage(
            @DestinationVariable String conversationId,
            ChatMessage message
    ) {
        ChatMessageEvent messageEvent = new ChatMessageEvent(
                UUID.randomUUID().toString(),
                message.conversationId(),
                message.senderId(),
                message.content(),
                Instant.now()
        );

        messageProducer.publish(messageEvent);
    }
}

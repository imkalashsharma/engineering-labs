package com.englabs.chatServer.conversation;

import com.englabs.chatServer.conversation.dto.event.ChatMessageEvent;
import com.englabs.chatServer.conversation.dto.request.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.Instant;
import java.util.UUID;

@Controller
public class ChatWebSocketController {
    private final SimpMessagingTemplate messagingTemplate;

    public ChatWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
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

        messagingTemplate.convertAndSend("/topic/conversations/" + conversationId, messageEvent);
    }


}

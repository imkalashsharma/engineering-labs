package com.englabs.chatServer.conversation.dto.event;

import java.time.Instant;

public record ChatMessageEvent(
        String messageId,
        String conversationId,
        String senderId,
        String content,
        Instant timestamp
) {}

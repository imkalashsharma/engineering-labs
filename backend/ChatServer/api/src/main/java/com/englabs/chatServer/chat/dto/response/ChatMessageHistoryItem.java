package com.englabs.chatServer.chat.dto.response;

import java.time.Instant;
import java.util.UUID;

public record ChatMessageHistoryItem(
        UUID messageId,
        String conversationId,
        UUID senderId,
        String content,
        Instant timestamp
) {}

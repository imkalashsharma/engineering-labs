package com.englabs.chatServer.conversation.dto.response;

public record JoinConversationResponse(
        String conversationId,
        String userId,
        String status
) {}

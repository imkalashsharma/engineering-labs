package com.englabs.chatServer.conversation.dto.request;

public record LeaveConversationRequest(
        String conversationCode,
        String userId
) {}

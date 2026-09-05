package com.englabs.chatServer.conversation.dto.request;

public record ChatMessage(
   String conversationId,
   String senderId,
   String content
) {}

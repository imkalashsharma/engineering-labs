package com.englabs.chatServer.conversation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record JoinConversationRequest(
        @NotBlank
        @Size(max = 100)
        String username
) {}

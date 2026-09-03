package com.englabs.chatServer.conversation;

import com.englabs.chatServer.conversation.dto.request.JoinConversationRequest;
import com.englabs.chatServer.conversation.dto.response.CreateConversationResponse;
import com.englabs.chatServer.conversation.dto.response.JoinConversationResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping("/create")
    public ResponseEntity<CreateConversationResponse> getConversations() {
        CreateConversationResponse response = conversationService.createConversation();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/{conversationCode}/join")
    public ResponseEntity<JoinConversationResponse> joinConversation(
            @PathVariable String code,
            @Valid @RequestBody JoinConversationRequest request
    ) {
        JoinConversationResponse response = conversationService.joinConversation(code, request.username());

        return ResponseEntity.ok(response);
    }
}

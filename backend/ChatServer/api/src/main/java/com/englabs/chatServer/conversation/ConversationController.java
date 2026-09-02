package com.englabs.chatServer.conversation;

import com.englabs.chatServer.conversation.dto.CreateConversationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

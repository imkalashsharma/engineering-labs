package com.englabs.chatServer.conversation;

import com.englabs.chatServer.chat.Message;
import com.englabs.chatServer.chat.MessageService;
import com.englabs.chatServer.chat.dto.response.ChatMessageHistoryItem;
import com.englabs.chatServer.conversation.dto.request.JoinConversationRequest;
import com.englabs.chatServer.conversation.dto.response.CreateConversationResponse;
import com.englabs.chatServer.conversation.dto.response.JoinConversationResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {
    private final ConversationService conversationService;
    private final MessageService messageService;

    public ConversationController(ConversationService conversationService, MessageService messageService) {
        this.conversationService = conversationService;
        this.messageService = messageService;
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
            @PathVariable String conversationCode,
            @Valid @RequestBody JoinConversationRequest request
    ) {
        JoinConversationResponse response = conversationService.joinConversation(conversationCode, request.username());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{conversationCode}/participants/{userId}")
    public ResponseEntity<CreateConversationResponse> leaveConversation(@PathVariable String conversationCode, @PathVariable UUID userId) {
        conversationService.leaveConversation(conversationCode, userId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{conversationCode}/messages")
    public ResponseEntity<List<ChatMessageHistoryItem>> getMessages(@PathVariable String conversationCode) {
        List<ChatMessageHistoryItem> messageHistory = conversationService.getMessages(conversationCode);

        return ResponseEntity.ok(messageHistory);
    }
}

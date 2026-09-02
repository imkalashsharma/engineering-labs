package com.englabs.chatServer.conversation;

import com.englabs.chatServer.conversation.dto.CreateConversationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@Service
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final ConversationCodeGenerator codeGenerator;

    public ConversationService(ConversationRepository conversationRepository, ConversationCodeGenerator codeGenerator) {
        this.codeGenerator = codeGenerator;
        this.conversationRepository = conversationRepository;
    }

    public CreateConversationResponse createConversation() {
        String conversationCode = generateUniqueCode();

        Conversation conversation = new Conversation();
        conversation.setConversationCode(conversationCode);
        conversation.setStatus(ConversationStatus.WAITING_FOR_USERS);

        conversationRepository.save(conversation);

        log.info("Created conversation with code {}", conversationCode);

        return new  CreateConversationResponse(conversationCode);
    }

    private String generateUniqueCode() {
        String code;

        do {
            code = codeGenerator.generate();
        } while (conversationRepository.existsByConversationCode(code));

        return code;
    }
}

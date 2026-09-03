package com.englabs.chatServer.conversation;

import com.englabs.chatServer.conversation.dto.response.CreateConversationResponse;
import com.englabs.chatServer.conversation.dto.response.JoinConversationResponse;
import com.englabs.chatServer.user.User;
import com.englabs.chatServer.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final ConversationParticipantRepository conversationParticipantRepository;
    private final UserRepository userRepository;

    private final ConversationCodeGenerator codeGenerator;

    public ConversationService(
            ConversationRepository conversationRepository,
            ConversationParticipantRepository conversationParticipantRepository,
            UserRepository userRepository,
            ConversationCodeGenerator codeGenerator
    ) {
        this.codeGenerator = codeGenerator;
        this.conversationParticipantRepository = conversationParticipantRepository;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
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

    @Transactional
    public JoinConversationResponse joinConversation(
            String conversationCode,
            String username
    ) {
        Conversation conversation = conversationRepository
                .findByConversationCode(conversationCode)
                .orElseThrow(() -> new IllegalArgumentException("No conversation found with code " + conversationCode));

        // current participant count in conversation
        long participantCount = conversationParticipantRepository.countByIdConversationId(conversation.getId());

        if(participantCount >= 2)
            throw new IllegalStateException("Conversation already have 2 participants.");

        // create new user
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setName(username);

        userRepository.save(user);

        // add new participant in the conversation
        ConversationParticipant participant = new ConversationParticipant();
        participant.setId(new ConversationParticipantId(conversation.getId(), user.getId()));
        participant.setUser(user);
        participant.setConversation(conversation);

        conversationParticipantRepository.save(participant);

        long newParticipantCount = participantCount + 1;

        if(newParticipantCount == 2) {
            conversation.setStatus(ConversationStatus.ACTIVE);
            conversationRepository.save(conversation);
        }

        return new JoinConversationResponse(
                conversation.getConversationCode(),
                user.getId().toString(),
                conversation.getStatus().name()
        );
    }
}

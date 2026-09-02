package com.englabs.chatServer.conversation;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    boolean existsByConversationCode(String code);
}

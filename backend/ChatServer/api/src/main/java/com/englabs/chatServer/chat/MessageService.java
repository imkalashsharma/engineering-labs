package com.englabs.chatServer.chat;

import com.englabs.chatServer.chat.dto.response.ChatMessageHistoryItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<ChatMessageHistoryItem> getHistory(String conversationId) {
        return messageRepository
                .findByKeyConversationIdOrderByKeyCreatedAtAsc(conversationId)
                .stream()
                .map(message -> new ChatMessageHistoryItem(
                        message.getKey().getMessageId(),
                        message.getKey().getConversationId(),
                        message.getSenderId(),
                        message.getContent(),
                        message.getKey().getCreatedAt()
                ))
                .toList();
    }
}

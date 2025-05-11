package com.nihalwanjari.weddingservices.service;

import com.nihalwanjari.weddingservices.entity.Contact;
import com.nihalwanjari.weddingservices.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;

    public Contact submitContact(Contact contact) {
        contact.setSubmittedAt(LocalDateTime.now());
        contact.setRead(false);
        return contactRepository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Contact markAsRead(Long id) {
        Contact contact = contactRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Contact not found"));
        contact.setRead(true);
        return contactRepository.save(contact);
    }

    public long getUnreadCount() {
        return contactRepository.countByReadFalse();
    }
}
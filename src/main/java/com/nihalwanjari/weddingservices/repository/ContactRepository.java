package com.nihalwanjari.weddingservices.repository;

import com.nihalwanjari.weddingservices.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    long countByReadFalse();
}
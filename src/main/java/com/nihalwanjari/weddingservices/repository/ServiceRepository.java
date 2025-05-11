package com.nihalwanjari.weddingservices.repository;

import com.nihalwanjari.weddingservices.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
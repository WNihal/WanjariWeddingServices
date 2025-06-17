package com.nihalwanjari.weddingservices.repository;

import com.nihalwanjari.weddingservices.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    
    @Query("SELECT s FROM Service s ORDER BY s.id ASC")
    List<Service> findAllOrderById();
}
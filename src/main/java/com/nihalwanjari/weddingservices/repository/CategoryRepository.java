package com.nihalwanjari.weddingservices.repository;

import com.nihalwanjari.weddingservices.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    @Query("SELECT c FROM Category c WHERE c.service.id = :serviceId ORDER BY c.id ASC")
    List<Category> findByServiceId(@Param("serviceId") Long serviceId);
    
    @Query("SELECT c FROM Category c ORDER BY c.id ASC")
    List<Category> findAllOrderById();
}
package com.nihalwanjari.weddingservices.repository;

import com.nihalwanjari.weddingservices.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByServiceId(Long serviceId);
}
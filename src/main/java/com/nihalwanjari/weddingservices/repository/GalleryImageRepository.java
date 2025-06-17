package com.nihalwanjari.weddingservices.repository;

import com.nihalwanjari.weddingservices.entity.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {
    
    @Query("SELECT g FROM GalleryImage g WHERE g.category.id = :categoryId ORDER BY g.id ASC")
    List<GalleryImage> findByCategoryId(@Param("categoryId") Long categoryId);
    
    @Query("SELECT g FROM GalleryImage g ORDER BY g.id ASC")
    List<GalleryImage> findAllOrderById();
}
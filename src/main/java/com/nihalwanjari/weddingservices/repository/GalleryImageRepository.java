package com.nihalwanjari.weddingservices.repository;

import com.nihalwanjari.weddingservices.entity.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {
    List<GalleryImage> findByCategoryId(Long categoryId);
}
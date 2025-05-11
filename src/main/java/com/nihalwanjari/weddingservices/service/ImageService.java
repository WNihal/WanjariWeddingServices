package com.nihalwanjari.weddingservices.service;

import com.nihalwanjari.weddingservices.entity.GalleryImage;
import com.nihalwanjari.weddingservices.repository.GalleryImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final GalleryImageRepository imageRepository;
    private final String uploadDir = "./uploads/images";

    public List<GalleryImage> getAllImages() {
        return imageRepository.findAll();
    }

    public List<GalleryImage> getImagesByCategory(Long categoryId) {
        return imageRepository.findByCategoryId(categoryId);
    }

    public GalleryImage uploadImage(Long categoryId, MultipartFile file, String caption) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // Save file to disk
        Files.copy(file.getInputStream(), filePath);

        // Create and save image metadata
        GalleryImage image = GalleryImage.builder()
                .fileName(fileName)
                .caption(caption)
                .id(categoryId)
                .build();

        return imageRepository.save(image);
    }

    public GalleryImage updateImage(Long id, MultipartFile file, String caption) throws IOException {
        GalleryImage existingImage = imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        if (file != null) {
            // Delete old file
            Path oldFilePath = Paths.get(uploadDir).resolve(existingImage.getFileName());
            Files.deleteIfExists(oldFilePath);

            // Save new file
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path newFilePath = Paths.get(uploadDir).resolve(fileName);
            Files.copy(file.getInputStream(), newFilePath);
            existingImage.setFileName(fileName);
        }

        existingImage.setCaption(caption);
        return imageRepository.save(existingImage);
    }

    public void deleteImage(Long id) throws IOException {
        GalleryImage image = imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        // Delete file from disk
        Path filePath = Paths.get(uploadDir).resolve(image.getFileName());
        Files.deleteIfExists(filePath);

        // Delete from database
        imageRepository.delete(image);
    }
}
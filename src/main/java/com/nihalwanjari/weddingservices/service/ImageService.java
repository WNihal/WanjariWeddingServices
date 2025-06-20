package com.nihalwanjari.weddingservices.service;

import com.nihalwanjari.weddingservices.entity.Category;
import com.nihalwanjari.weddingservices.entity.GalleryImage;
import com.nihalwanjari.weddingservices.repository.CategoryRepository;
import com.nihalwanjari.weddingservices.repository.GalleryImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final GalleryImageRepository imageRepository;
    private final CategoryRepository categoryRepository;
    private final String uploadDir = "./uploads/images";

    public List<GalleryImage> getAllImages() {
        List<GalleryImage> images = imageRepository.findAllOrderById();
        System.out.println("ImageService: Found " + images.size() + " images");
        for (int i = 0; i < images.size(); i++) {
            GalleryImage image = images.get(i);
            System.out.println("Image " + (i + 1) + ": ID=" + image.getId() + ", FileName=" + image.getFileName() + 
                             ", CategoryID=" + (image.getCategory() != null ? image.getCategory().getId() : "null"));
        }
        return images;
    }

    public List<Map<String, Object>> getAllImagesAsMap() {
        List<GalleryImage> images = getAllImages();
        return images.stream().map(this::convertToMap).collect(Collectors.toList());
    }

    public List<GalleryImage> getImagesByCategory(Long categoryId) {
        List<GalleryImage> images = imageRepository.findByCategoryId(categoryId);
        System.out.println("ImageService: Found " + images.size() + " images for category " + categoryId);
        for (int i = 0; i < images.size(); i++) {
            GalleryImage image = images.get(i);
            System.out.println("Image " + (i + 1) + " for category " + categoryId + ": ID=" + image.getId() + ", FileName=" + image.getFileName());
        }
        return images;
    }

    public List<Map<String, Object>> getImagesByCategoryAsMap(Long categoryId) {
        List<GalleryImage> images = getImagesByCategory(categoryId);
        return images.stream().map(this::convertToMap).collect(Collectors.toList());
    }

    public GalleryImage uploadImage(Long categoryId, MultipartFile file, String caption) throws IOException {
        System.out.println("ImageService: Uploading image for category " + categoryId);
        
        // Find the category first
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

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
                .category(category)
                .build();

        GalleryImage savedImage = imageRepository.save(image);
        System.out.println("ImageService: Created image with ID - " + savedImage.getId());
        
        // Verify the image was saved by checking total count
        long totalImages = imageRepository.count();
        System.out.println("ImageService: Total images in database: " + totalImages);
        
        return savedImage;
    }

    public Map<String, Object> uploadImageAsMap(Long categoryId, MultipartFile file, String caption) throws IOException {
        GalleryImage savedImage = uploadImage(categoryId, file, caption);
        return convertToMap(savedImage);
    }

    public GalleryImage updateImage(Long id, MultipartFile file, String caption) throws IOException {
        System.out.println("ImageService: Updating image with ID - " + id);
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

        if (caption != null) {
            existingImage.setCaption(caption);
        }
        
        GalleryImage updatedImage = imageRepository.save(existingImage);
        System.out.println("ImageService: Updated image with ID - " + updatedImage.getId());
        return updatedImage;
    }

    public Map<String, Object> updateImageAsMap(Long id, MultipartFile file, String caption) throws IOException {
        GalleryImage updatedImage = updateImage(id, file, caption);
        return convertToMap(updatedImage);
    }

    public void deleteImage(Long id) throws IOException {
        System.out.println("ImageService: Deleting image with ID - " + id);
        GalleryImage image = imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        // Delete file from disk
        Path filePath = Paths.get(uploadDir).resolve(image.getFileName());
        Files.deleteIfExists(filePath);

        // Delete from database
        imageRepository.delete(image);
        System.out.println("ImageService: Deleted image with ID - " + id);
        
        // Verify the image was deleted by checking total count
        long totalImages = imageRepository.count();
        System.out.println("ImageService: Total images in database after deletion: " + totalImages);
    }

    private Map<String, Object> convertToMap(GalleryImage image) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", image.getId());
        map.put("fileName", image.getFileName());
        map.put("caption", image.getCaption());
        map.put("url", "http://localhost:8080/api/images/" + image.getFileName());
        
        // Add category information without causing circular reference
        if (image.getCategory() != null) {
            Map<String, Object> categoryMap = new HashMap<>();
            categoryMap.put("id", image.getCategory().getId());
            categoryMap.put("name", image.getCategory().getName());
            map.put("category", categoryMap);
        }
        
        return map;
    }
}
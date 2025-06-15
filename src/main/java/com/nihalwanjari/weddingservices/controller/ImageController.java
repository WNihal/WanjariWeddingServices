package com.nihalwanjari.weddingservices.controller;

import com.nihalwanjari.weddingservices.entity.GalleryImage;
import com.nihalwanjari.weddingservices.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;
    private final String uploadDir = "./uploads/images";

    @GetMapping
    public ResponseEntity<List<GalleryImage>> getAllImages() {
        System.out.println("ImageController: GET /api/images called");
        List<GalleryImage> images = imageService.getAllImages();
        System.out.println("ImageController: Returning " + images.size() + " images");
        return ResponseEntity.ok(images);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<GalleryImage>> getImagesByCategory(@PathVariable Long categoryId) {
        System.out.println("ImageController: GET /api/images/category/" + categoryId + " called");
        List<GalleryImage> images = imageService.getImagesByCategory(categoryId);
        return ResponseEntity.ok(images);
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity<GalleryImage> uploadImage(
            @PathVariable Long categoryId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String caption) throws IOException {
        System.out.println("ImageController: POST /api/images/" + categoryId + " called");
        GalleryImage uploadedImage = imageService.uploadImage(categoryId, file, caption);
        return ResponseEntity.ok(uploadedImage);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> serveImage(@PathVariable String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() && resource.isReadable()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryImage> updateImage(
            @PathVariable Long id,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) String caption) throws IOException {
        System.out.println("ImageController: PUT /api/images/" + id + " called");
        GalleryImage updatedImage = imageService.updateImage(id, file, caption);
        return ResponseEntity.ok(updatedImage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id) throws IOException {
        System.out.println("ImageController: DELETE /api/images/" + id + " called");
        imageService.deleteImage(id);
        return ResponseEntity.ok().build();
    }
}
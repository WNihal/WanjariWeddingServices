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

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;
    private final String uploadDir = "./uploads/images";

    @GetMapping
    public ResponseEntity<?> getAllImages() {
        return ResponseEntity.ok(imageService.getAllImages());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getImagesByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(imageService.getImagesByCategory(categoryId));
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity<GalleryImage> uploadImage(
            @PathVariable Long categoryId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String caption) throws IOException {
        return ResponseEntity.ok(imageService.uploadImage(categoryId, file, caption));
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
        return ResponseEntity.ok(imageService.updateImage(id, file, caption));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id) throws IOException {
        imageService.deleteImage(id);
        return ResponseEntity.ok().build();
    }
}
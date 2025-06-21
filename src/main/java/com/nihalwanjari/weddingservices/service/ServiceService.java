package com.nihalwanjari.weddingservices.service;

import com.nihalwanjari.weddingservices.entity.Service;
import com.nihalwanjari.weddingservices.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository serviceRepository;
    private final String uploadDir = "./uploads/services";

    public List<Service> getAllServices() {
        List<Service> services = serviceRepository.findAllOrderById();
        System.out.println("ServiceService: Found " + services.size() + " services");
        for (int i = 0; i < services.size(); i++) {
            Service service = services.get(i);
            System.out.println("Service " + (i + 1) + ": ID=" + service.getId() + ", Name=" + service.getName());
        }
        return services;
    }

    public Service createService(String name, String description, String icon, MultipartFile file) throws IOException {
        System.out.println("ServiceService: Creating service - " + name);
        
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

        // Create service with file URL
        Service service = Service.builder()
                .name(name)
                .description(description)
                .icon(icon)
                .thumbnail("http://localhost:8080/api/services/images/" + fileName)
                .build();

        Service savedService = serviceRepository.save(service);
        System.out.println("ServiceService: Created service with ID - " + savedService.getId());
        
        // Verify the service was saved by checking total count
        long totalServices = serviceRepository.count();
        System.out.println("ServiceService: Total services in database: " + totalServices);
        
        return savedService;
    }

    public Service updateService(Long id, String name, String description, String icon, MultipartFile file) throws IOException {
        System.out.println("ServiceService: Updating service with ID - " + id);
        Service existingService = serviceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found"));
        
        existingService.setName(name);
        existingService.setDescription(description);
        existingService.setIcon(icon);

        if (file != null && !file.isEmpty()) {
            // Delete old file if it exists
            if (existingService.getThumbnail() != null) {
                String oldFileName = existingService.getThumbnail().substring(existingService.getThumbnail().lastIndexOf("/") + 1);
                Path oldFilePath = Paths.get(uploadDir).resolve(oldFileName);
                Files.deleteIfExists(oldFilePath);
            }

            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save new file
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);
            existingService.setThumbnail("http://localhost:8080/api/services/images/" + fileName);
        }
        
        Service updatedService = serviceRepository.save(existingService);
        System.out.println("ServiceService: Updated service with ID - " + updatedService.getId());
        return updatedService;
    }

    public void deleteService(Long id) {
        System.out.println("ServiceService: Deleting service with ID - " + id);
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        // Delete thumbnail file if it exists
        if (service.getThumbnail() != null) {
            try {
                String fileName = service.getThumbnail().substring(service.getThumbnail().lastIndexOf("/") + 1);
                Path filePath = Paths.get(uploadDir).resolve(fileName);
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                System.err.println("Failed to delete service thumbnail file: " + e.getMessage());
            }
        }

        serviceRepository.deleteById(id);
        System.out.println("ServiceService: Deleted service with ID - " + id);
        
        // Verify the service was deleted by checking total count
        long totalServices = serviceRepository.count();
        System.out.println("ServiceService: Total services in database after deletion: " + totalServices);
    }
}
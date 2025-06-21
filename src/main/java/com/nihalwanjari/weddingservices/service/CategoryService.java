package com.nihalwanjari.weddingservices.service;

import com.nihalwanjari.weddingservices.entity.Category;
import com.nihalwanjari.weddingservices.entity.Service;
import com.nihalwanjari.weddingservices.repository.CategoryRepository;
import com.nihalwanjari.weddingservices.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
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

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ServiceRepository serviceRepository;
    private final String uploadDir = "./uploads/categories";

    public List<Category> getAllCategories() {
        List<Category> categories = categoryRepository.findAllOrderById();
        System.out.println("CategoryService: Found " + categories.size() + " categories");
        for (int i = 0; i < categories.size(); i++) {
            Category category = categories.get(i);
            System.out.println("Category " + (i + 1) + ": ID=" + category.getId() + ", Name=" + category.getName() + 
                             ", ServiceID=" + (category.getService() != null ? category.getService().getId() : "null"));
        }
        return categories;
    }

    public List<Map<String, Object>> getAllCategoriesAsMap() {
        List<Category> categories = getAllCategories();
        return categories.stream().map(this::convertToMap).collect(Collectors.toList());
    }

    public List<Category> getCategoriesByService(Long serviceId) {
        List<Category> categories = categoryRepository.findByServiceId(serviceId);
        System.out.println("CategoryService: Found " + categories.size() + " categories for service " + serviceId);
        for (int i = 0; i < categories.size(); i++) {
            Category category = categories.get(i);
            System.out.println("Category " + (i + 1) + " for service " + serviceId + ": ID=" + category.getId() + ", Name=" + category.getName());
        }
        return categories;
    }

    public List<Map<String, Object>> getCategoriesByServiceAsMap(Long serviceId) {
        List<Category> categories = getCategoriesByService(serviceId);
        return categories.stream().map(this::convertToMap).collect(Collectors.toList());
    }

    public Category createCategory(String name, String description, Long serviceId, MultipartFile file) throws IOException {
        System.out.println("CategoryService: Creating category - " + name + " for service " + serviceId);
        
        // Find the service
        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + serviceId));

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

        // Create category with file URL
        Category category = Category.builder()
                .name(name)
                .description(description)
                .thumbnail("http://localhost:8080/api/categories/images/" + fileName)
                .service(service)
                .build();

        Category savedCategory = categoryRepository.save(category);
        System.out.println("CategoryService: Created category with ID - " + savedCategory.getId());
        
        // Verify the category was saved by checking total count
        long totalCategories = categoryRepository.count();
        System.out.println("CategoryService: Total categories in database: " + totalCategories);
        
        return savedCategory;
    }

    public Map<String, Object> createCategoryAsMap(String name, String description, Long serviceId, MultipartFile file) throws IOException {
        Category savedCategory = createCategory(name, description, serviceId, file);
        return convertToMap(savedCategory);
    }

    public Category updateCategory(Long id, String name, String description, Long serviceId, MultipartFile file) throws IOException {
        System.out.println("CategoryService: Updating category with ID - " + id);
        Category existingCategory = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + serviceId));
        
        existingCategory.setName(name);
        existingCategory.setDescription(description);
        existingCategory.setService(service);

        if (file != null && !file.isEmpty()) {
            // Delete old file if it exists
            if (existingCategory.getThumbnail() != null) {
                String oldFileName = existingCategory.getThumbnail().substring(existingCategory.getThumbnail().lastIndexOf("/") + 1);
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
            existingCategory.setThumbnail("http://localhost:8080/api/categories/images/" + fileName);
        }
        
        Category updatedCategory = categoryRepository.save(existingCategory);
        System.out.println("CategoryService: Updated category with ID - " + updatedCategory.getId());
        return updatedCategory;
    }

    public Map<String, Object> updateCategoryAsMap(Long id, String name, String description, Long serviceId, MultipartFile file) throws IOException {
        Category updatedCategory = updateCategory(id, name, description, serviceId, file);
        return convertToMap(updatedCategory);
    }

    public void deleteCategory(Long id) {
        System.out.println("CategoryService: Deleting category with ID - " + id);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Delete thumbnail file if it exists
        if (category.getThumbnail() != null) {
            try {
                String fileName = category.getThumbnail().substring(category.getThumbnail().lastIndexOf("/") + 1);
                Path filePath = Paths.get(uploadDir).resolve(fileName);
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                System.err.println("Failed to delete category thumbnail file: " + e.getMessage());
            }
        }

        categoryRepository.deleteById(id);
        System.out.println("CategoryService: Deleted category with ID - " + id);
        
        // Verify the category was deleted by checking total count
        long totalCategories = categoryRepository.count();
        System.out.println("CategoryService: Total categories in database after deletion: " + totalCategories);
    }

    private Map<String, Object> convertToMap(Category category) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", category.getId());
        map.put("name", category.getName());
        map.put("description", category.getDescription());
        map.put("thumbnail", category.getThumbnail());
        
        // Add service information without causing circular reference
        if (category.getService() != null) {
            Map<String, Object> serviceMap = new HashMap<>();
            serviceMap.put("id", category.getService().getId());
            serviceMap.put("name", category.getService().getName());
            map.put("service", serviceMap);
        }
        
        return map;
    }
}
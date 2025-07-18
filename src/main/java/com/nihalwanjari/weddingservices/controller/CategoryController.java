package com.nihalwanjari.weddingservices.controller;

import com.nihalwanjari.weddingservices.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllCategories() {
        System.out.println("CategoryController: GET /api/categories called");
        List<Map<String, Object>> categories = categoryService.getAllCategoriesAsMap();
        System.out.println("CategoryController: Returning " + categories.size() + " categories");
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Map<String, Object>>> getCategoriesByService(@PathVariable Long serviceId) {
        System.out.println("CategoryController: GET /api/categories/service/" + serviceId + " called");
        List<Map<String, Object>> categories = categoryService.getCategoriesByServiceAsMap(serviceId);
        System.out.println("CategoryController: Returning " + categories.size() + " categories for service " + serviceId);
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createCategory(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("serviceId") Long serviceId,
            @RequestParam("file") MultipartFile file) throws IOException {
        System.out.println("CategoryController: POST /api/categories called with: " + name);
        Map<String, Object> createdCategory = categoryService.createCategoryAsMap(name, description, serviceId, file);
        return ResponseEntity.ok(createdCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateCategory(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("serviceId") Long serviceId,
            @RequestParam(required = false) MultipartFile file) throws IOException {
        System.out.println("CategoryController: PUT /api/categories/" + id + " called");
        Map<String, Object> updatedCategory = categoryService.updateCategoryAsMap(id, name, description, serviceId, file);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        System.out.println("CategoryController: DELETE /api/categories/" + id + " called");
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
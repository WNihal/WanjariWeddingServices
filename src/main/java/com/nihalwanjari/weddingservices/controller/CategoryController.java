package com.nihalwanjari.weddingservices.controller;

import com.nihalwanjari.weddingservices.entity.Category;
import com.nihalwanjari.weddingservices.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        System.out.println("CategoryController: GET /api/categories called");
        List<Category> categories = categoryService.getAllCategories();
        System.out.println("CategoryController: Returning " + categories.size() + " categories");
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Category>> getCategoriesByService(@PathVariable Long serviceId) {
        System.out.println("CategoryController: GET /api/categories/service/" + serviceId + " called");
        List<Category> categories = categoryService.getCategoriesByService(serviceId);
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        System.out.println("CategoryController: POST /api/categories called with: " + category.getName());
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.ok(createdCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        System.out.println("CategoryController: PUT /api/categories/" + id + " called");
        Category updatedCategory = categoryService.updateCategory(id, category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        System.out.println("CategoryController: DELETE /api/categories/" + id + " called");
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
package com.nihalwanjari.weddingservices.service;

import com.nihalwanjari.weddingservices.entity.Category;
import com.nihalwanjari.weddingservices.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getCategoriesByService(Long serviceId) {
        List<Category> allCategories = categoryRepository.findByServiceId(serviceId);
        System.out.println("All Categories : " + allCategories);
        return allCategories;

    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category category) {
        Category existingCategory = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found"));
        
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        existingCategory.setThumbnail(category.getThumbnail());
        existingCategory.setService(category.getService());
        
        return categoryRepository.save(existingCategory);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
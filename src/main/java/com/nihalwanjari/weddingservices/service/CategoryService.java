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
        List<Category> categories = categoryRepository.findAll();
        System.out.println("CategoryService: Found " + categories.size() + " categories");
        for (Category category : categories) {
            System.out.println("Category: ID=" + category.getId() + ", Name=" + category.getName() + 
                             ", ServiceID=" + (category.getService() != null ? category.getService().getId() : "null"));
        }
        return categories;
    }

    public List<Category> getCategoriesByService(Long serviceId) {
        List<Category> categories = categoryRepository.findByServiceId(serviceId);
        System.out.println("CategoryService: Found " + categories.size() + " categories for service " + serviceId);
        return categories;
    }

    public Category createCategory(Category category) {
        System.out.println("CategoryService: Creating category - " + category.getName() + 
                         " for service " + (category.getService() != null ? category.getService().getId() : "null"));
        Category savedCategory = categoryRepository.save(category);
        System.out.println("CategoryService: Created category with ID - " + savedCategory.getId());
        return savedCategory;
    }

    public Category updateCategory(Long id, Category category) {
        System.out.println("CategoryService: Updating category with ID - " + id);
        Category existingCategory = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found"));
        
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        existingCategory.setThumbnail(category.getThumbnail());
        existingCategory.setService(category.getService());
        
        Category updatedCategory = categoryRepository.save(existingCategory);
        System.out.println("CategoryService: Updated category with ID - " + updatedCategory.getId());
        return updatedCategory;
    }

    public void deleteCategory(Long id) {
        System.out.println("CategoryService: Deleting category with ID - " + id);
        categoryRepository.deleteById(id);
        System.out.println("CategoryService: Deleted category with ID - " + id);
    }
}
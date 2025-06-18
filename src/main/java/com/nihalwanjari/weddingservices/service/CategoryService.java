package com.nihalwanjari.weddingservices.service;

import com.nihalwanjari.weddingservices.entity.Category;
import com.nihalwanjari.weddingservices.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

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

    public Category createCategory(Category category) {
        System.out.println("CategoryService: Creating category - " + category.getName() + 
                         " for service " + (category.getService() != null ? category.getService().getId() : "null"));
        Category savedCategory = categoryRepository.save(category);
        System.out.println("CategoryService: Created category with ID - " + savedCategory.getId());
        
        // Verify the category was saved by checking total count
        long totalCategories = categoryRepository.count();
        System.out.println("CategoryService: Total categories in database: " + totalCategories);
        
        return savedCategory;
    }

    public Map<String, Object> createCategoryAsMap(Category category) {
        Category savedCategory = createCategory(category);
        return convertToMap(savedCategory);
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

    public Map<String, Object> updateCategoryAsMap(Long id, Category category) {
        Category updatedCategory = updateCategory(id, category);
        return convertToMap(updatedCategory);
    }

    public void deleteCategory(Long id) {
        System.out.println("CategoryService: Deleting category with ID - " + id);
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
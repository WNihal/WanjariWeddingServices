package com.nihalwanjari.weddingservices.controller;

import com.nihalwanjari.weddingservices.entity.Service;
import com.nihalwanjari.weddingservices.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {
    private final ServiceService serviceService;

    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        System.out.println("ServiceController: GET /api/services called");
        List<Service> services = serviceService.getAllServices();
        System.out.println("ServiceController: Returning " + services.size() + " services");
        return ResponseEntity.ok(services);
    }

    @PostMapping
    public ResponseEntity<Service> createService(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("icon") String icon,
            @RequestParam("file") MultipartFile file) throws IOException {
        System.out.println("ServiceController: POST /api/services called with: " + name);
        Service createdService = serviceService.createService(name, description, icon, file);
        return ResponseEntity.ok(createdService);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("icon") String icon,
            @RequestParam(required = false) MultipartFile file) throws IOException {
        System.out.println("ServiceController: PUT /api/services/" + id + " called");
        Service updatedService = serviceService.updateService(id, name, description, icon, file);
        return ResponseEntity.ok(updatedService);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        System.out.println("ServiceController: DELETE /api/services/" + id + " called");
        serviceService.deleteService(id);
        return ResponseEntity.ok().build();
    }
}
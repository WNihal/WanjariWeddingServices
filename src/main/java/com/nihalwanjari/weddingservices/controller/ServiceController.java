package com.nihalwanjari.weddingservices.controller;

import com.nihalwanjari.weddingservices.entity.Service;
import com.nihalwanjari.weddingservices.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        System.out.println("ServiceController: POST /api/services called with: " + service.getName());
        Service createdService = serviceService.createService(service);
        return ResponseEntity.ok(createdService);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(@PathVariable Long id, @RequestBody Service service) {
        System.out.println("ServiceController: PUT /api/services/" + id + " called");
        Service updatedService = serviceService.updateService(id, service);
        return ResponseEntity.ok(updatedService);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        System.out.println("ServiceController: DELETE /api/services/" + id + " called");
        serviceService.deleteService(id);
        return ResponseEntity.ok().build();
    }
}
package com.nihalwanjari.weddingservices.service;

import com.nihalwanjari.weddingservices.entity.Service;
import com.nihalwanjari.weddingservices.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.*;
import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository serviceRepository;

    public List<Service> getAllServices() {
        List<Service> services = serviceRepository.findAll();
        System.out.println("ServiceService: Found " + services.size() + " services");
        for (Service service : services) {
            System.out.println("Service: ID=" + service.getId() + ", Name=" + service.getName());
        }
        return services;
    }

    public Service createService(Service service) {
        System.out.println("ServiceService: Creating service - " + service.getName());
        Service savedService = serviceRepository.save(service);
        System.out.println("ServiceService: Created service with ID - " + savedService.getId());
        return savedService;
    }

    public Service updateService(Long id, Service service) {
        System.out.println("ServiceService: Updating service with ID - " + id);
        Service existingService = serviceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found"));
        
        existingService.setName(service.getName());
        existingService.setDescription(service.getDescription());
        existingService.setThumbnail(service.getThumbnail());
        existingService.setIcon(service.getIcon());
        
        Service updatedService = serviceRepository.save(existingService);
        System.out.println("ServiceService: Updated service with ID - " + updatedService.getId());
        return updatedService;
    }

    public void deleteService(Long id) {
        System.out.println("ServiceService: Deleting service with ID - " + id);
        serviceRepository.deleteById(id);
        System.out.println("ServiceService: Deleted service with ID - " + id);
    }
}
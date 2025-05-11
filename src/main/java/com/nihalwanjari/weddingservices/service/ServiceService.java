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
        return serviceRepository.findAll();
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service service) {
        Service existingService = serviceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found"));
        
        existingService.setName(service.getName());
        existingService.setDescription(service.getDescription());
        existingService.setThumbnail(service.getThumbnail());
        existingService.setIcon(service.getIcon());
        
        return serviceRepository.save(existingService);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}
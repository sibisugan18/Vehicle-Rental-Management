package com.example.vrm.Services;

import com.example.vrm.Model.*;
import com.example.vrm.Repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Optional<Vehicle> updateVehicle(Long id, Vehicle updated) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setVehicleNumber(updated.getVehicleNumber());
            vehicle.setType(updated.getType());
            vehicle.setModel(updated.getModel());
            vehicle.setRentalPrice(updated.getRentalPrice());
            vehicle.setAvailable(updated.getAvailable());
            return vehicleRepository.save(vehicle);
        });
    }

    public boolean deleteVehicle(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

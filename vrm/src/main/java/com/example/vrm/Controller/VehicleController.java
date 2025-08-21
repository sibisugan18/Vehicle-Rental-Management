package com.example.vrm.Controller;

import com.example.vrm.Model.*;
import com.example.vrm.Repository.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleRepository vehicleRepository;

    public VehicleController(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vehicle> addVehicle(@Valid @RequestBody Vehicle vehicle) {
        return ResponseEntity.status(201).body(vehicleRepository.save(vehicle));
    }

   @PutMapping("/{id}")
public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle updatedVehicle) {
    return vehicleRepository.findById(id)
        .map(vehicle -> {
            vehicle.setModel(updatedVehicle.getModel());
            vehicle.setType(updatedVehicle.getType());
            vehicle.setRentalPrice(updatedVehicle.getRentalPrice());
            vehicle.setAvailable(updatedVehicle.getAvailable());
            vehicle.setVehicleNumber(updatedVehicle.getVehicleNumber());
            return ResponseEntity.ok(vehicleRepository.save(vehicle));
        })
        .orElse(ResponseEntity.notFound().build());
}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

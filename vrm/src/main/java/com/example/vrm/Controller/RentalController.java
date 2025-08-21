package com.example.vrm.Controller;

import com.example.vrm.Model.*;
import com.example.vrm.Repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    private final RentalRepository rentalRepository;
    private final VehicleRepository vehicleRepository;
    private final CustomerRepository customerRepository;

    public RentalController(RentalRepository rentalRepository, VehicleRepository vehicleRepository, CustomerRepository customerRepository) {
        this.rentalRepository = rentalRepository;
        this.vehicleRepository = vehicleRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    @PostMapping("/start")
    public ResponseEntity<?> startRental(@RequestBody Rental rentalRequest) {
        Vehicle vehicle = vehicleRepository.findById(rentalRequest.getId()).orElse(null);
        if (vehicle == null) return ResponseEntity.status(404).body("Vehicle not found");
        if (!vehicle.getAvailable()) return ResponseEntity.status(400).body("Vehicle not available");

        // Save customer (or retrieve existing)
        Customer customer = rentalRequest.getCustomer();
        customer = customerRepository.save(customer);

        Rental rental = new Rental();
        rental.setVehicle(vehicle);
        rental.setCustomer(customer);
        rental.setStartTime(LocalDateTime.now());
        rental = rentalRepository.save(rental);

        vehicle.setAvailable(false);
        vehicleRepository.save(vehicle);

        return ResponseEntity.status(201).body(rental);
    }

    @PutMapping("/{id}/end")
    public ResponseEntity<?> endRental(@PathVariable Long id) {
        Rental rental = rentalRepository.findById(id).orElse(null);
        if (rental == null) return ResponseEntity.status(404).body("Rental not found");
        if (rental.getEndTime() != null) return ResponseEntity.status(400).body("Rental already ended");

        LocalDateTime endTime = LocalDateTime.now();
        rental.setEndTime(endTime);

        long durationInMinutes = Duration.between(rental.getStartTime(), endTime).toMinutes();
        long durationHours = (long) Math.ceil(durationInMinutes / 60.0);
        double totalCost = durationHours * rental.getVehicle().getRentalPrice();

        rental.setTotalCost(totalCost);
        rentalRepository.save(rental);

        // Mark vehicle available again
        Vehicle vehicle = rental.getVehicle();
        vehicle.setAvailable(true);
        vehicleRepository.save(vehicle);

        // Return rental ID and total cost as a JSON response
        return ResponseEntity.ok(Map.of(
            "rentalId", rental.getId(),
            "totalCost", totalCost
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRental(@PathVariable Long id) {
        Rental rental = rentalRepository.findById(id).orElse(null);
        if (rental == null) {
            return ResponseEntity.status(404).body("Rental not found");
        }

        rentalRepository.delete(rental);
        return ResponseEntity.ok("Rental deleted successfully");
    }
}

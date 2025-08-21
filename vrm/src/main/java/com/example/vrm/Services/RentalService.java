package com.example.vrm.Services;

import com.example.vrm.Model.*;
import com.example.vrm.Repository.*;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;
    private final VehicleRepository vehicleRepository;
    private final CustomerRepository customerRepository;

    public RentalService(RentalRepository rentalRepository, VehicleRepository vehicleRepository, CustomerRepository customerRepository) {
        this.rentalRepository = rentalRepository;
        this.vehicleRepository = vehicleRepository;
        this.customerRepository = customerRepository;
    }

    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    public Optional<Rental> startRental(Long vehicleId, String customerName) {
        Optional<Vehicle> vehicleOpt = vehicleRepository.findById(vehicleId);

        if (vehicleOpt.isEmpty() || !vehicleOpt.get().getAvailable()) {
            return Optional.empty();
        }

        Vehicle vehicle = vehicleOpt.get();
        vehicle.setAvailable(false);
        vehicleRepository.save(vehicle);

        Customer customer = new Customer();
        customer.setName(customerName);
        customer = customerRepository.save(customer);

        Rental rental = new Rental();
        rental.setVehicle(vehicle);
        rental.setCustomer(customer);
        rental.setStartTime(LocalDateTime.now());

        return Optional.of(rentalRepository.save(rental));
    }

    public Optional<Rental> endRental(Long rentalId) {
        Optional<Rental> rentalOpt = rentalRepository.findById(rentalId);

        if (rentalOpt.isEmpty() || rentalOpt.get().getEndTime() != null) {
            return Optional.empty();
        }

        Rental rental = rentalOpt.get();
        rental.setEndTime(LocalDateTime.now());

        long minutes = Duration.between(rental.getStartTime(), rental.getEndTime()).toMinutes();
        long hours = (long) Math.ceil(minutes / 60.0);

        double totalCost = hours * rental.getVehicle().getRentalPrice();
        rental.setTotalCost(totalCost);
        rentalRepository.save(rental);

        // Make vehicle available again
        Vehicle vehicle = rental.getVehicle();
        vehicle.setAvailable(true);
        vehicleRepository.save(vehicle);

        return Optional.of(rental);
    }
}

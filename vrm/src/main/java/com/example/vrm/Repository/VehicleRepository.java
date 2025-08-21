package com.example.vrm.Repository;

import com.example.vrm.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    // Custom queries can be added if needed, e.g.:
    // List<Vehicle> findByAvailableTrue();
}

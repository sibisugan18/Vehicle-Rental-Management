package com.example.vrm.Repository;

import com.example.vrm.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    // Example: List<Rental> findByCustomerName(String name);
}

package com.example.vrm.Controller;

import com.example.vrm.DTO.LoginRequest;
import com.example.vrm.Model.Customer;
import com.example.vrm.Repository.CustomerRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // ✅ Get all customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // ✅ Add new customer
    @PostMapping
    public ResponseEntity<Customer> addCustomer(@Valid @RequestBody Customer customer) {
        return ResponseEntity.status(201).body(customerRepository.save(customer));
    }

    // ✅ Delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // HTTP 204
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Update customer
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @Valid @RequestBody Customer updatedCustomer) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            customer.setName(updatedCustomer.getName());
            customer.setEmail(updatedCustomer.getEmail());
            customer.setPhone(updatedCustomer.getPhone());
            customer.setPassword(updatedCustomer.getPassword()); // 👈 simple update
            return ResponseEntity.ok(customerRepository.save(customer));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ SIGN UP
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@Valid @RequestBody Customer customer) {
        // Check if email already exists
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("❌ Email already registered!");
        }
        customerRepository.save(customer);
        return ResponseEntity.ok("✅ Customer registered successfully!");
    }

    // ✅ SIGN IN
   // ✅ SIGN IN
@PostMapping("/signin")
public ResponseEntity<String> signIn(@RequestBody LoginRequest loginRequest) {
    Optional<Customer> existingCustomer = customerRepository.findByEmail(loginRequest.getEmail());

    if (existingCustomer.isPresent()) {
        Customer customer = existingCustomer.get();
        // Compare plain text passwords
        if (loginRequest.getPassword().equals(customer.getPassword())) {
            return ResponseEntity.ok("✅ Login successful! Welcome, " + customer.getName());
        }
    }
    return ResponseEntity.status(401).body("❌ Invalid email or password");
}

}

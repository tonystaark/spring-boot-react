package com.ufinity.seab.userService.controller;

import com.ufinity.seab.userService.exception.ResourceNotFoundException;
import com.ufinity.seab.userService.model.User;
import com.ufinity.seab.userService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")

public class UserController {
    private static final Logger LOGGER=LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserRepository userRepository;

    // Get All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        LOGGER.info("get all users");
        return userRepository.findAll();
    }
    // Create a new User
    @PostMapping("/user")
    public User createUser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    // Get a Single User
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable(value="id") Long userId){
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User","id",userId));
    }

    // Update a User
    @PutMapping("/user/{id}")
    public User updateNote(@PathVariable(value="id") Long userId, @Valid @RequestBody User userDetails){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User","id",userId));
        user.setUsername(userDetails.getUsername());

        User updatedUser = userRepository.save(user);
        return updatedUser;
    }

    // Delete a User
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable(value="id") Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User","id",userId));
        userRepository.delete(user);
        return ResponseEntity.ok().build();
    }
}
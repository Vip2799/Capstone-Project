package com.niit.userService.UserService.controller;

import com.niit.MovieService.domain.Movie;
import com.niit.userService.UserService.exception.UserAlreadyExistsException;
import com.niit.userService.UserService.models.User;
import com.niit.userService.UserService.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> insertUser(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
        }catch (UserAlreadyExistsException ex){
            throw new UserAlreadyExistsException();
        }
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<?> editUser(@PathVariable String email, @RequestBody User user){

        return new ResponseEntity<>(userService.updateUser(email,user),HttpStatus.OK);
    }



}

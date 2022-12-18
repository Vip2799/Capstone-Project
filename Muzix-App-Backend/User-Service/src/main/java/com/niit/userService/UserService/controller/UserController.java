package com.niit.userService.UserService.controller;

import com.niit.MovieService.domain.Movie;
import com.niit.userService.UserService.exception.UserAlreadyExistsException;
import com.niit.userService.UserService.exception.UserNotFoundException;
import com.niit.userService.UserService.models.User;
import com.niit.userService.UserService.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = ("http://localhost:4200"))
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

    @PutMapping("/update")
    public ResponseEntity<?> editUser( @RequestBody User user) throws UserNotFoundException {

        return new ResponseEntity<>(userService.updateUser(user),HttpStatus.OK);
    }

    @GetMapping("/getProfile/{email}")
    public ResponseEntity<?> getProfile(@PathVariable String email){
        return new ResponseEntity(userService.getUserById(email),HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) throws UserNotFoundException {
        ResponseEntity<?> responseEntity = null;
        try{
            responseEntity = new ResponseEntity<>(userService.deleteUser(email),HttpStatus.ACCEPTED);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        }catch (Exception e){
            responseEntity=new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

}

package com.niit.userService.UserService.services;

import com.niit.userService.UserService.exception.UserAlreadyExistsException;
import com.niit.userService.UserService.models.User;

public interface UserService {

    public User addUser(User user) throws UserAlreadyExistsException;

   public User updateUser(String email, User user);

}

package com.niit.userService.UserService.services;

import com.niit.MovieService.domain.Movie;
import com.niit.userService.UserService.exception.UserAlreadyExistsException;
import com.niit.userService.UserService.models.User;
import com.niit.userService.UserService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;


    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(User user) throws UserAlreadyExistsException {
        if(userRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        return userRepository.insert(user);
    }

    @Override
    public User updateUser(String email, User user) {
       User user1 = userRepository.findById(email).get();

       user1.setUserName(user.getUserName());
       user1.setAge(user.getAge());
       user1.setMobileNo(user.getMobileNo());
       user1.setAddress(user.getAddress());

        return userRepository.save(user1);
    }


}

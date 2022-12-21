package com.niit.userService.UserService.controller;

import com.niit.MovieService.domain.Movie;
import com.niit.userService.UserService.exception.UserAlreadyExistsException;
import com.niit.userService.UserService.exception.UserNotFoundException;
import com.niit.userService.UserService.models.OrderResponse;
import com.niit.userService.UserService.models.User;
import com.niit.userService.UserService.services.UserServiceImpl;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
//<<<<<<< HEAD
//@CrossOrigin(origins = ("http://localhost:4200"))
//=======
//>>>>>>> 2e92e0b5efbddefbecfb61c4b70f68e99fa283b4
@RequestMapping("/api/v1/")
public class UserController {

    @Autowired
    private UserServiceImpl userService;
    private RazorpayClient client;

//    rzp_test_9IVAsnKVhMQV9W  SDGrLM81GO7h7A7qTPWINhtW
    private String secretKey = "rzp_test_9IVAsnKVhMQV9W";
    private String secretId = "SDGrLM81GO7h7A7qTPWINhtW";
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

    @PostMapping( "/createOrder")
    public OrderResponse createOrder(@RequestBody User user) throws RazorpayException {
        OrderResponse response = new OrderResponse();
        System.out.println("user = " + user);
        try{
            client = new RazorpayClient(secretKey,secretId);
            Order order = createRazorPayOrder(user.getAmount());
            System.out.println("---------------------------");
            String orderId = (String) order.get("id");
            System.out.println("Order ID: " + orderId);
            System.out.println("---------------------------");
            response.setRazorpayOrderId(orderId);
            response.setApplicationFee(user.getAmount());
            response.setSecretKey(secretKey);
            response.setSecretId(secretId);
            response.setPgName("razor1");

            return response;
        } catch (RazorpayException e) {
            e.printStackTrace();
        }

        return response;
    }

    private Order createRazorPayOrder(int amount) throws RazorpayException {

        JSONObject options = new JSONObject();
        options.put("amount", amount*100);
        options.put("currency", "INR");
        options.put("receipt", "txn_123456");
        options.put("payment_capture", 1);
        return client.orders.create(options);
    }


}

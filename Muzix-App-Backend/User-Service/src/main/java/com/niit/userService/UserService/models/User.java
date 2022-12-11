package com.niit.userService.UserService.models;

import com.niit.MovieService.domain.Movie;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class User {

    @Id
    private String email;
    private String userName;
    private int age;
    private long mobileNo;
    private Address address;

    public User() {
    }

    public User(String email, String userName, int age, long mobileNo, Address address) {
        this.email = email;
        this.userName = userName;
        this.age = age;
        this.mobileNo = mobileNo;
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public long getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(long mobileNo) {
        this.mobileNo = mobileNo;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }


    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", userName='" + userName + '\'' +
                ", age=" + age +
                ", mobileNo=" + mobileNo +
                ", address=" + address +
                '}';
    }
}

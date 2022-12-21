package com.niit.userService.UserService.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niit.userService.UserService.exception.UserAlreadyExistsException;
import com.niit.userService.UserService.exception.UserNotFoundException;
import com.niit.userService.UserService.models.Address;
import com.niit.userService.UserService.models.User;
import com.niit.userService.UserService.services.UserServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    User user;
    Address address;
    @Autowired
    private MockMvc mockMvc;
    @Mock
    private UserServiceImpl userService;
    @InjectMocks
    private UserController userController;

    private static String jsonToString(final Object ob) throws JsonProcessingException {
        String result;
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonContent = mapper.writeValueAsString(ob);
            result = jsonContent;
        } catch (JsonProcessingException e) {
            result = "JSON processing error";
        }

        return result;
    }

    @BeforeEach
    public void setUp() {
        address = new Address("Highway", "Pune", "MH", 412308);
        user = new User("mona@gmail.com", "Monali",12,"premium", "profile1", "mona123", 24, 9874586134L, address);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @AfterEach
    public void tearDown() {
        address = null;
        user = null;
    }

    @Test
    public void insertUserTest() throws Exception {

        when(userService.addUser(any())).thenReturn(user);
        mockMvc.perform(
                post("/api/register").contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user))).andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());
        verify(userService, times(1)).addUser(any());
    }

    @Test
    public void insertUserFailureTest() throws Exception {

        when(userService.addUser(any())).thenThrow(UserAlreadyExistsException.class);
        mockMvc.perform(
                post("/api/register").contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user))).andExpect(status().isConflict()).andDo(MockMvcResultHandlers.print());
        verify(userService, times(1)).addUser(any());
    }

    @Test
    public void deleteUserTest() throws Exception {

        when(userService.deleteUser(anyString())).thenReturn(true);
        mockMvc.perform(
                delete("/api/delete/mona@gmail.com").contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user))).andExpect(status().isAccepted()).andDo(MockMvcResultHandlers.print());
        verify(userService, times(1)).deleteUser(anyString());
    }

    @Test
    public void deleteUserFailureTest() throws Exception {

        when(userService.deleteUser(anyString())).thenThrow(UserNotFoundException.class);
        mockMvc.perform(
                delete("/api/delete/mona@gmail.com").contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user))).andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print());
        verify(userService, times(1)).deleteUser(anyString());
    }


//    @Test
//    public void updateUserTest() throws Exception{
//
//        Address address1 = new Address("street1","Pune","MH",412308);
//        User user1 = new User("mona@gmail.com","Test","pic1","test123",23,9451278234L,address1);
//
//        when(userService.updateUser(anyString(),user1)).thenReturn(user);
//        mockMvc.perform(
//                put("/api/update/mona@gmail.com").contentType(MediaType.APPLICATION_JSON)
//                        .content(jsonToString(user1))).andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());
//        verify(userService,times(1)).updateUser(anyString(),user1);
//    }

}

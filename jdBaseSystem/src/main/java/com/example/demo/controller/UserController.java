package com.example.demo.controller;

import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserMapper userMapper;

    @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
    public User getUser(@PathVariable("userId") long id){
        return this.userMapper.selectUserById(id);
    }

    @RequestMapping(value = "/updateuser/{userId}",method = RequestMethod.POST)
    @ResponseBody
    public int updateUser(@PathVariable("userId") long id,
                          @RequestParam("name") String name,
                          @RequestParam("password") String password,
                          @RequestParam("phone") String phone){
        return this.userMapper.update(id,name,password,phone);
    };

    @RequestMapping(value = "/adduser",method = RequestMethod.POST)
    @ResponseBody
    public int addUser(   @RequestParam("name") String name,
                          @RequestParam("password") String password,
                          @RequestParam("phone") String phone){
        User user =  this.userMapper.selectUserByName(name);
        if(user != null){
            throw new RuntimeException("用户名已存在,不可以重复添加");
        }
        return this.userMapper.insert(name,password,phone);
    };

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User>getAllUser(){
        return this.userMapper.getAllUsers();
    }


    @RequestMapping(value = "/user/{userId}", method = RequestMethod.DELETE)
    public int deleteUser(@PathVariable("userId") long id){
        return this.userMapper.delete(id);
    }

    @RequestMapping(value = "/confirm/{name}",method = RequestMethod.GET)
    public  boolean ConfirmUserNameIsValidate(@PathVariable("name") String name){
        User user =  this.userMapper.selectUserByName(name);
        if(user == null){
            return true;
        } else {
            return false;
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public User confirmNameAndPassword(@RequestParam("name") String name, @RequestParam("password") String password) throws Exception{
       User user =  this.userMapper.selectUserByName(name);

       if(user == null){
           throw new RuntimeException("用户名不存在");
       }
       if(!user.getPassword().equals(password)){
           throw new RuntimeException("密码错误");
       }
       user.setPassword(null);
        return user;
    }
    @RequestMapping(value = "/changepassword", method = RequestMethod.POST)
    public int changePassword (
            @RequestParam("id") long id,
            @RequestParam("oldPassword") String oldPassword,
            @RequestParam("newPassword") String newPassword
    )throws Exception{
        User user = this.userMapper.selectUserById(id);
        String password = user.getPassword();
        if(!password.equals(oldPassword) ){
            throw new  RuntimeException("原始密码错误，无法修改");
        }
        user.setPassword(newPassword);
        return this.userMapper.update(id,user.getName(),user.getPassword(),user.getPhone());
    }
}

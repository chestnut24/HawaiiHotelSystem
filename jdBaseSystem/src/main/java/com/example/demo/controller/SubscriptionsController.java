package com.example.demo.controller;

import com.example.demo.mapper.RoomMapper;
import com.example.demo.mapper.SubscriptionMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.Room;
import com.example.demo.model.Subscription;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SubscriptionsController {

    @Autowired
    private SubscriptionMapper subscriptionMapper;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoomMapper roomMapper;

    @RequestMapping("/test")
    public String hello(){
        return "hello";
    }

    @RequestMapping(value = "/subscriptions/{id}", method = RequestMethod.GET)
    public Subscription getSubscription(@PathVariable("id") long id){
        return this.subscriptionMapper.selectsubscriptionById(id);
    }

    @RequestMapping(value = "/subscriptions",method = RequestMethod.GET)
    public List<Subscription> getAllSubscriptions(){
        List<Subscription> list = this.subscriptionMapper.getAllsubscriptions();
        return getUserInfo(list);
    }

    @RequestMapping(value = "/usersubscriptions/{userId}",method = RequestMethod.GET)
    public List<Subscription> getSubscriptionByUserId(@PathVariable("userId") long id){
        return this.subscriptionMapper.selectsubscriptionByUserId(id);
    }

    @RequestMapping(value = "/roomsubscriptions/{roomId}",method = RequestMethod.GET)
    public List<Subscription> getAllSubscriptionByRoomId(@PathVariable("roomId") long id){
        return this.subscriptionMapper.selectsubscriptionByRoomId(id);
    }

    @RequestMapping(value = "/refreshstatus/{id}",method = RequestMethod.POST)
    public int refreshStatus(@PathVariable("id") long id, @RequestParam("status") int status){
        return this.subscriptionMapper.updateStatus(id,status);
    }

    @RequestMapping(value = "/addsubscribe",method = RequestMethod.POST)
    public int addSubscribe(@RequestParam("userId") long userId ,@RequestParam("roomId") long roomId,
                            @RequestParam("startTime") long startTime,@RequestParam("endTime") long endTime){
        return this.subscriptionMapper.insert(userId,roomId,startTime,endTime);
    }
    @RequestMapping(value = "/mysubscribe/{id}",method = RequestMethod.GET)
    public List<Subscription> mySubscribe(@PathVariable("id") long id){

        List<Subscription> list = this.subscriptionMapper.selectsubscriptionByUserId(id);
        return getUserInfo(list);
    }

    private List<Subscription> getUserInfo( List<Subscription> list){
        list.forEach(
                item ->{
                    User user = this.userMapper.selectUserById(item.getUser_id());
                    Room room = this.roomMapper.selectRoomById(item.getRoom_id());
                    item.setUserName(user.getName());
                    item.setRoomNumber(room.getRoom_number());
                }
        );
        return list;
    }
}

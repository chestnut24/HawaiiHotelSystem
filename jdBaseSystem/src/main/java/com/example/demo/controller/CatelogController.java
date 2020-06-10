package com.example.demo.controller;

import com.example.demo.mapper.CatelogMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.Catelog;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CatelogController {
    @Autowired
    private CatelogMapper catelogMapper;


    @RequestMapping(value = "/catelog/{catelogId}", method = RequestMethod.GET)
    public Catelog getUser(@PathVariable("catelogId") long id){
        return this.catelogMapper.selectCatelogById(id);
    }

    @RequestMapping(value = "/updatcatelog/{catelogId}",method = RequestMethod.POST)
    @ResponseBody
    public int updateUser(@PathVariable("catelogId") long id,
                          @RequestParam("name") String name){
        return this.catelogMapper.update(id,name);
    };

    @RequestMapping(value = "/catelogs", method = RequestMethod.GET)
    public List<Catelog> getAllUser(){
        return this.catelogMapper.getAllCatelogs();
    }

    @RequestMapping(value = "/addcatelog",method = RequestMethod.POST)
    @ResponseBody
    public int addCatelog( @RequestParam("name") String name){
        Catelog catelog = this.catelogMapper.selectCatelogByName(name);
        if(catelog != null){
            throw  new RuntimeException("无法添加，该类别名称已存在");
        }
        return this.catelogMapper.insert(name);
    };

    @RequestMapping(value = "/catelog/{catelogId}", method = RequestMethod.DELETE)
    public int deleteUser(@PathVariable("catelogId") long id){
        return this.catelogMapper.delete(id);
    }
}

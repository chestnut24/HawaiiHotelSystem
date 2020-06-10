package com.example.demo.mapper;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper {

    @Select("select * from user where id = #{id}")
    User selectUserById(@Param("id") long id);

    @Select("select * from user where name = #{name}")
    User selectUserByName(@Param("name") String name);

    @Select("select * from user")
    List<User> getAllUsers();

    @Insert("INSERT INTO user (`id`, `name`,`password` ,`phone`) VALUES (NULL, #{name},#{password},#{phone});")
    int insert(@Param("name") String name, @Param("password") String password,@Param("phone") String phone);

    @Update("UPDATE user SET name= #{name}, password= #{password},phone= #{phone} WHERE id = #{id}")
    int update (@Param("id") long id,@Param("name") String name,@Param("password") String password,@Param("phone") String phone);

    @Delete("DELETE FROM user WHERE id = #{id}")
    int delete(@Param("id") long id);
}

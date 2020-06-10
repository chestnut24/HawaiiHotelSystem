package com.example.demo.mapper;



import com.example.demo.model.Subscription;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SubscriptionMapper {
    @Select("select * from subscription where id = #{id}")
    Subscription selectsubscriptionById(@Param("id") long id);

    @Select("select * from subscription where room_id = #{id}")
    List<Subscription> selectsubscriptionByRoomId(@Param("id") long id);

    @Select("select * from subscription where user_id = #{id}")
    List<Subscription> selectsubscriptionByUserId(@Param("id") long id);


    @Select("select * from subscription")
    List<Subscription> getAllsubscriptions();

    @Insert("INSERT INTO subscription (`id`, `user_id`,`room_id` ,`start_time`,`end_time`) VALUES (NULL, #{userId},#{roomId},#{startTime},#{endTime});")
    int insert(@Param("userId") long userId, @Param("roomId") long roomId,@Param("startTime") long startTime,@Param("endTime") long endTime);

    @Update("UPDATE subscription SET user_id= #{userId}, room_id= #{roomId},start_time= #{startTime},end_time= #{endTime} WHERE id = #{id}")
    int update (@Param("id") long id,@Param("userId") long userId, @Param("roomId") long roomId,@Param("startTime") long startTime,@Param("endTime") long endTime);

    @Update("UPDATE subscription SET status = #{status} WHERE id = #{id}")
    int updateStatus(@Param("id") long id,@Param("status") int status);


    @Delete("DELETE FROM subscription WHERE id = #{id}")
    int delete(@Param("id") long id);


}

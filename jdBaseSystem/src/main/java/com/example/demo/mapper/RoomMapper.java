package com.example.demo.mapper;

import com.example.demo.model.Room;
import com.example.demo.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface RoomMapper {
    @Select("select * from room where id = #{id} ")
    Room selectRoomById(@Param("id") long id);

    @Select("select * from room where catelog_id = #{id} order by room_number ASC")
    List<Room> selectRoomByCatelogId(@Param("id") long id);

    @Select("select * from room where catelog_id = #{id} and money >= #{minPrice} and money <= #{maxPrice} order by room_number ASC")
    List<Room> slectRommByPrice(@Param("id") long id,@Param("minPrice") long minPrice,@Param("maxPrice") long maxPrice);

    @Select("select * from room where room_number = #{number}")
    Room selectRoomByRoomNumber(@Param("number") int number);

    @Select("select * from room order by room_number ASC")
    List<Room> getAllRoom();

    @Insert("INSERT INTO room (`id`, `area`,`catelog_id`,`room_number`,`image_url`,`remark`,`money`) VALUES " +
            "(NULL, #{area},#{catelogId},#{roomNumber},#{imageUrl},#{remark},#{money});")
    int insert(@Param("area") int area, @Param("catelogId") long catelogId,@Param("roomNumber") int roomNumber,
               @Param("imageUrl") String imageUrl,@Param("remark") String remark,@Param("money") int money);


    @Update("UPDATE room SET area= #{area},catelog_id= #{catelogId},room_number= #{roomNumber},image_url= #{imageUrl},remark= #{remark},money= #{money} WHERE id = #{id};")
    int update (@Param("id") long id,@Param("area") int area,@Param("catelogId") long catelogId,@Param("roomNumber") int roomNumber,
                @Param("imageUrl") String imageUrl,@Param("remark") String remark,@Param("money") int money);

    @Delete("DELETE FROM room  WHERE id = #{id}")
    int delete(@Param("id") long id);
}

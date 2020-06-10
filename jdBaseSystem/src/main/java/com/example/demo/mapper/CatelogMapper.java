package com.example.demo.mapper;

import com.example.demo.model.Catelog;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CatelogMapper {
    @Select("select * from catelog where id = #{id} ")
    Catelog selectCatelogById(@Param("id") long id);

    @Select("select * from catelog where name = #{name} ")
    Catelog selectCatelogByName(@Param("name") String name);

    @Select("select * from catelog order by id ASC")
    List<Catelog> getAllCatelogs();


    @Insert("INSERT INTO catelog (`id`, `name`) VALUES (NULL, #{name});")
    int insert(@Param("name") String name);

    @Update("UPDATE catelog SET name= #{name} WHERE id = #{id}")
    int update (@Param("id") long id,@Param("name") String name);

    @Delete("DELETE FROM catelog WHERE id = #{id}")
    int delete(@Param("id") long id);
}

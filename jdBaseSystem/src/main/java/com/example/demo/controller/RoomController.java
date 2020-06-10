package com.example.demo.controller;

import com.example.demo.mapper.CatelogMapper;
import com.example.demo.mapper.RoomMapper;
import com.example.demo.mapper.SubscriptionMapper;
import com.example.demo.model.Catelog;
import com.example.demo.model.Room;
import com.example.demo.model.Subscription;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.logging.FileHandler;

@RestController
@RequestMapping("/api")
public class RoomController {
    @Autowired
    private RoomMapper roomMapper;

    @Autowired
    private CatelogMapper catelogMapper;

    @Autowired
    private SubscriptionMapper subscriptionMapper;
    @RequestMapping(value = "/room/{roomId}", method = RequestMethod.GET)
    public Room getRoom(@PathVariable("roomId") long id){
        return this.roomMapper.selectRoomById(id);
    }

    @RequestMapping(value = "/updateroom/{roomId}",method = RequestMethod.POST)
    @ResponseBody
    public int updateRoom(@PathVariable("roomId") long id,
                          @RequestParam("area") int area,
                          @RequestParam("catelogId") long catelogId,
                          @RequestParam("roomNumber") int roomNumber,
                          @RequestParam(value = "file",required = false) MultipartFile file,
                          @RequestParam(value = "imageUrl",required = false) String url,
                          @RequestParam(value = "remark",required = false) String remark,
                          @RequestParam("money") int money
                          ){
        String imageUrl;
        if(file != null){
            imageUrl  = this.uploadFile(file);
        } else{
            imageUrl = url;
        }

        return this.roomMapper.update(id,area,catelogId,roomNumber,imageUrl,remark,money);
    };

    @RequestMapping(value = "/rooms", method = RequestMethod.GET)
    public List<Room> getAllRoom(){
        List<Room> list = this.roomMapper.getAllRoom();
        list.forEach(
                item ->{
                    Catelog catelog = this.catelogMapper.selectCatelogById(item.getCatelog_id());
                    item.setCatelogName(catelog.getName());
                }
        );
        return list;
    }

    @RequestMapping(value = "/rooms/{catelogId}", method = RequestMethod.GET)
    public List<Room> getAllRoomByCatelog(
            @PathVariable("catelogId") long id
    ){
        return this.roomMapper.selectRoomByCatelogId(id);
    }

    @RequestMapping(value = "/rooms/{catelogId}", method = RequestMethod.POST)
    public List<Room> getAllRoomByPrice(
            @PathVariable("catelogId") long id,
            @RequestParam(value = "minPrice",required = false) Long minPrice,
            @RequestParam(value = "maxPrice",required = false) Long maxPrice,
            @RequestParam(value = "startTime",required = false) Long startTime,
            @RequestParam(value = "endTime",required = false) Long endTime
    ){
        if(minPrice != null && maxPrice != null && startTime == null && endTime ==null){
            return this.roomMapper.slectRommByPrice(id,minPrice,maxPrice);
        }
        if(minPrice == null && maxPrice == null && startTime != null && endTime !=null){
            List<Room> roomList = this.roomMapper.selectRoomByCatelogId(id);
            return this.findRooms(roomList,startTime,endTime);
        }
        if(minPrice != null && maxPrice != null && startTime != null && endTime !=null){
            List<Room> roomList = this.roomMapper.slectRommByPrice(id,minPrice,maxPrice);
            return this.findRooms(roomList,startTime,endTime);
        }
        return null;
    }

    @RequestMapping(value = "/addroom",method = RequestMethod.POST)
    @ResponseBody
    public int addRoom(@RequestParam("area") int area,
                       @RequestParam("catelogId") long catelogId,
                       @RequestParam("roomNumber") int roomNumber,
                       @RequestParam(value = "file",required = false) MultipartFile file,
                       @RequestParam(value = "remark",required = false) String remark,
                       @RequestParam("money") int money) throws Exception{
        Room room = this.roomMapper.selectRoomByRoomNumber(roomNumber);
        if(room != null){
            throw new RuntimeException("房间号已存在，不可以重复添加");
        }
        String imageUrl =  this.uploadFile(file);
        return this.roomMapper.insert(area,catelogId,roomNumber,imageUrl,remark,money);
    };

    @RequestMapping(value = "/room/{roomId}", method = RequestMethod.DELETE)
    public int deleteRoom(@PathVariable("roomId") long id){
        return this.roomMapper.delete(id);
    }

    private  List<Room> findRooms(List<Room> roomList,long startTime,long endTime){
        List<Room> rooms = new ArrayList<>();
        roomList.forEach(
                item ->{
                    List<Subscription> list = this.subscriptionMapper.selectsubscriptionByRoomId(item.getId());
                    AtomicBoolean canUse = new AtomicBoolean(true);
                    list.forEach(
                            subscription ->{
                                long start = subscription.getStart_time();
                                long end = subscription.getEnd_time();
                                if((startTime>= start && startTime< end) || (endTime> start && endTime <= end) || (endTime>end && startTime<start)){
                                    canUse.set(false);
                                }
                            }
                    );
                    if(canUse.get()){
                        rooms.add(item);
                    }
                }
        );
        return rooms;
    }


    private boolean creatDirs(String dir) {
        if (!dir.endsWith(File.separator)) {
            dir = dir + File.separator;
        }
        File descDir = new File(dir);
        if (descDir.exists()) {
            return true;
        }
        // 创建目录
        if (descDir.mkdirs()) {
            return true;
        } else {
            return false;
        }
    }

    private String uploadFile(MultipartFile file){
        try{
            String name = file.getOriginalFilename();
            String rareName = name.substring(name.lastIndexOf('.'));
            String originName = new Date().getTime() + rareName;
            String path = "D:\\code\\System\\hotel\\JDSystemManager-origin\\JDSystemManager\\src\\assets\\image\\"+ originName;
            File result = new File(path);//要写入的图片
            if (result.exists()) {//校验该文件是否已存在
                result.delete();//删除对应的文件，从磁盘中删除
                result = new File(path);//只是创建了一个File对象，并没有在磁盘下创建文件
            }
            if (!result.exists()) {//如果文件不存在
                result.createNewFile();//会在磁盘下创建文件，但此时大小为0K
            }
            InputStream inputStream = file.getInputStream();
            FileOutputStream out = new FileOutputStream(result);// 指定要写入的图片
            int n = 0;// 每次读取的字节长度
            byte[] bb = new byte[1024];// 存储每次读取的内容
            while ((n = inputStream.read(bb)) != -1) {
                out.write(bb, 0, n);// 将读取的内容，写入到输出流当中
            }
            //执行完以上后，磁盘下的该文件才完整，大小是实际大小
            out.close();// 关闭输入输出流
            inputStream.close();
            return originName;
        }catch (Exception e){
            throw  new  RuntimeException("上传失败");
        }

    }
    private File multipartToFile(MultipartFile multfile) throws IOException {
        CommonsMultipartFile cf = (CommonsMultipartFile)multfile;
        //这个myfile是MultipartFile的
        DiskFileItem fi = (DiskFileItem) cf.getFileItem();
        File file = fi.getStoreLocation();
        //手动创建临时文件

        return file;
    }
}

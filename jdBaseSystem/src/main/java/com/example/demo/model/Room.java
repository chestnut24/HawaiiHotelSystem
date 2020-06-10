package com.example.demo.model;

public class Room {
    private  long id;
    private int area;
    private long catelog_id;
    private int room_number;
    private String image_url;
    private String remark;
    private int money;
    private String catelogName;
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }


    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public long getCatelog_id() {
        return catelog_id;
    }

    public void setCatelog_id(long catelog_id) {
        this.catelog_id = catelog_id;
    }

    public int getRoom_number() {
        return room_number;
    }

    public void setRoom_number(int room_number) {
        this.room_number = room_number;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getCatelogName() {
        return catelogName;
    }

    public void setCatelogName(String catelogName) {
        this.catelogName = catelogName;
    }
    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", area=" + area +
                ", catelog_id=" + catelog_id +
                ", room_number=" + room_number +
                ", image_url='" + image_url + '\'' +
                ", remark='" + remark + '\'' +
                ", money=" + money +
                '}';
    }
}

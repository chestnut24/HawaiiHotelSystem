package com.example.demo.model;

public class Subscription {
    private long id;
    private long user_id;
    private long room_id;
    private  long start_time;
    private long end_time;
    private int status;
    private String userName;
    private int roomNumber;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public long getRoom_id() {
        return room_id;
    }

    public void setRoom_id(long room_id) {
        this.room_id = room_id;
    }

    public long getStart_time() {
        return start_time;
    }

    public void setStart_time(long start_time) {
        this.start_time = start_time;
    }

    public long getEnd_time() {
        return end_time;
    }

    public void setEnd_time(long end_time) {
        this.end_time = end_time;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    @Override
    public String toString() {
        return "Subscription{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", room_id=" + room_id +
                ", start_time=" + start_time +
                ", end_time=" + end_time +
                ", status=" + status +
                ", userName='" + userName + '\'' +
                ", roomNumber=" + roomNumber +
                '}';
    }
}

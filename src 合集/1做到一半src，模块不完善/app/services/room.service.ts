import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../common/interface/room';
import { API } from '../common/api';

@Injectable()
export class RoomService {

  constructor(
    private http:HttpClient
  ) { }

  getAllRooms(){
   return this.http.get<Room[]>(API.ROOMS);
  }

  getRoomsByCatelog(id:string){
   return this.http.get<Room[]>(API.ROOMS + '/' + id);
  }
  deleteRoomById(id:number){
    return this.http.delete(API.ROOM + '/' + id)
  }

  addRoom(formData:FormData){
    return this.http.post(API.ADD_ROOM,formData);
  }

  updateRoom(id:number, formData:FormData){
    return this.http.post(API.UPDATE_ROOM + '/' + id,formData);
  }

  getAllRoomsByPrice(id:number,formData: FormData){
    return this.http.post<Room[]>(API.ROOMS + '/' + id, formData);
  }
}

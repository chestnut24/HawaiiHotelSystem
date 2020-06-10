import {Component, OnInit, ElementRef} from '@angular/core';
import {RoomService} from 'src/app/services/room.service';
import {Room} from 'src/app/common/interface/room';


@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss']
})
export class MarqueeComponent implements OnInit {
  array = [1, 2, 3, 4];
  dataList: Room[] = [];

  constructor(
    private element: ElementRef,
    private roomService: RoomService
  ) {

  }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(data => {
      this.dataList = data;
    });
    setTimeout(() => {
      const container = document.getElementById('container');
      container.style.height = (window.innerHeight - 217) + 'px';
      console.log('window.innerHeight', window.innerHeight);
      console.log('window.screen.availHeight', window.screen.availHeight);
      console.log('window.screen.Height', window.screen.height);
      container.style.backgroundColor = 'red';
      console.log('ontainer', container);
    });


  }

}

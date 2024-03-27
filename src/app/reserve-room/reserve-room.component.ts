import { Component, Input } from '@angular/core';
import { ColorLegend } from '../interfaces/ColorLegend';

@Component({
  selector: 'app-reserve-room',
  templateUrl: './reserve-room.component.html',
  styleUrls: ['./reserve-room.component.scss']
})
export class ReserveRoomComponent {
  constructor(
  ) { }
  @Input() colorLegend:ColorLegend[]=[];
  showRooms=false;
  onClick(): void {
    this.showRooms=!this.showRooms;
  }
  onNoClick(): void {
  }
}

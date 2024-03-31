import { Component, Input, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { Setup } from '../interfaces/setup';

@Component({
  selector: 'app-reserve-room',
  templateUrl: './reserve-room.component.html',
  styleUrls: ['./reserve-room.component.scss']
})
export class ReserveRoomComponent {
  constructor(
  ) { }
  
  @ViewChild('myCalendar')
  myCalendar!: Calendar;
  @Input() colorLegend: Setup[] = [];
  showRoomsSetup = false;
  roomSetup: Setup | null = null;
  date: Date | undefined;
  disabled=false;
  onClick(): void {
    this.showRoomsSetup = !this.showRoomsSetup;
  }
  onNoClick(): void {
  }
  selectRoomSetup(roomSetup: Setup) {
    this.roomSetup = roomSetup;
    this.showRoomsSetup = false;
  }

  formatDate(inputDate: Date = new Date()) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayOfWeekIndex = inputDate.getDay();
    const monthIndex = inputDate.getMonth();
    const dayOfMonth = inputDate.getDate();

    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    const month = monthsOfYear[monthIndex];

    return `${dayOfWeek}, ${month} ${dayOfMonth}`;
  }
}

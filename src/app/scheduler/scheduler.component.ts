import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Room } from '../interfaces/Room';
import { Reservation } from '../interfaces/Reservation';
import { DragEventExtendTime } from '../interfaces/DragEventExtendTime';
import { Setup } from '../interfaces/setup';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @Input() reservations!: Reservation[];
  @Input() selectedTitles!: string[];
  @Input() setup!: Setup[];
  rooms: Room[] = [{ id: 1, capacity: 55, setup: "Event", name: "Zayed" }, { id: 2, capacity: 55, setup: "Event", name: "October" }, { id: 3, capacity: 55, setup: "Event", name: "Mohandseen" }, { id: 4, capacity: 55, setup: "Event", name: "Haram" }, { id: 5, capacity: 55, setup: "Event", name: "Zamalek" }, { id: 6, capacity: 55, setup: "Event", name: "Maadi" }, { id: 7, capacity: 55, setup: "Event", name: "Heliopolis" }, { id: 8, capacity: 55, setup: "Event", name: "New Cairo" }];
  hours: string[] = ["8:00:00", "9:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00"];
  mouseYFromComponent: number = 0;
  isDraggingToExtendTime = false;
  isDraggingToMove = false;
  draggingItemId: number = 0;
  hideFor: {} = {} //string : string 
  ngOnInit(): void {
    this.hideFor = this.setAdjacencyMap();
    // this.bookings.forEach(booking => {
    //   this.setHiddenBasedOnAdjacency(booking);
    // })
  }
  setAdjacencyMap() {
    let adjacencyMap: any = {};
    for (let i = 0; i < this.rooms.length; i++) {
      adjacencyMap[this.rooms[i].name] = this.rooms[i + 1];
    }
    return adjacencyMap;
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDraggingToExtendTime && !this.isDraggingToMove)
      return;
    if (this.isDraggingToExtendTime) {
      if (Math.abs(this.mouseYFromComponent - event.pageY) >= 12.5) {
        let timeTo = this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].to;
        if (event.pageY - this.mouseYFromComponent > 0) {
          this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].to = this.incrementTime(timeTo);
        } else {
          this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].to = this.decrementTime(timeTo);
        }
        this.mouseYFromComponent = event.pageY
      }
    }
    if (this.isDraggingToMove) {
      if (Math.abs(this.mouseYFromComponent - event.pageY) >= 12.5) {
        let timeTo = this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].to;
        let timeFrom = this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].from;
        if (event.pageY - this.mouseYFromComponent > 0) {
          this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].to = this.incrementTime(timeTo);
          this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].from = this.incrementTime(timeFrom);
        } else {
          this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].to = this.decrementTime(timeTo);
          this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0].from = this.decrementTime(timeFrom);
        }
        console.log(this.reservations.filter(reservation => reservation.id == this.draggingItemId)[0])
        this.mouseYFromComponent = event.pageY
      }
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDraggingToExtendTime || this.isDraggingToMove) {
      this.isDraggingToExtendTime = false;
      this.isDraggingToMove = false;
    }
  }
  getReservation(time: string, room: string): Reservation[] {
    let [hour] = time.split(":").map(Number);
    let bookedRooms: Reservation[] = [];
    for (let reservation of this.reservations) {
      let [fromHours] = reservation.from.split(":").map(Number);
      if (fromHours === hour && reservation.roomName === room) {
        bookedRooms.push(reservation);
      }
    }
    if (this.selectedTitles.length === 0) {
      return bookedRooms;
    } else {
      return bookedRooms.filter(reservation => this.selectedTitles.includes(reservation.roomSetup))
    }
  }
  incrementTime(time: string) {
    let [hours, minutes, seconds] = time.split(":").map(Number);

    minutes += 15;
    if (minutes >= 60) {
      hours = (hours + 1) % 20;
      minutes %= 60;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  decrementTime(time: string) {
    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (minutes < 15) {
      minutes = 60 + minutes - 15;
      if (hours > 8) {
        hours--;
      } else {
        hours = 19;
      }
    } else {
      minutes -= 15;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  getTime12HourFormat(time: string) {
    const [hours] = time.split(":").map(Number);
    let period = 'AM';
    let formattedHours = hours;

    if (hours >= 12) {
      period = 'PM';
      formattedHours = hours === 12 ? 12 : hours - 12;
    }

    if (formattedHours === 0) {
      formattedHours = 12;
    }

    return `${formattedHours} ${period}`;
  }
  onMouseDownToExtend(event: DragEventExtendTime) {
    this.mouseYFromComponent = event.pageY;
    this.isDraggingToExtendTime = event.isDragging;
    this.draggingItemId = event.id;
  }
  onMouseDownToMove(event: DragEventExtendTime) {
    this.mouseYFromComponent = event.pageY;
    this.isDraggingToMove = event.isDragging;
    this.draggingItemId = event.id;
  }
  deleteReservation(reservationId: number) {

  }

  // setHiddenBasedOnAdjacency(formData: BookRoom) {
  //   formData.rooms.forEach(room => {
  //     formData.hiddenFor.push(this.hideFor[room as keyof typeof this.hideFor])
  //   })
  // }

  // setExtend(time: string, roomName: string, id: number): number {
  //   const booking = this.getBooking(time, roomName).filter(booking => booking.id == id)[0];
  //   let counter = 1;
  //   for (let room of this.rooms) {
  //     if (room == roomName) {
  //       let bookedRoom = room;
  //       while (true) {
  //         if (booking?.rooms.includes(this.hideFor[bookedRoom as keyof typeof this.hideFor])) {
  //           counter++;
  //           bookedRoom = this.hideFor[bookedRoom as keyof typeof this.hideFor];
  //         } else {
  //           break;
  //         }
  //       }
  //     }
  //   }

  //   return counter;
  // }
}

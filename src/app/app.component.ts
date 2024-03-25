import { Component, OnInit, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookRoom } from './interfaces/BookRoom';
import { Time } from './interfaces/Time';
import { DragEventExtendTime } from './interfaces/DragEventExtendTime';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'greater-cairo-room';
  bookRoomForm!: FormGroup;
  // private mouseMoveSubject = new Subject<MouseEvent>();
  // private mouseDragSubject = new Subject<DragEvent>();
  dragging = false;
  yOnMousedown = 0;
  bookings: BookRoom[] = [
    { "id": 1, "from": { hours: 8, minutes: 0 }, "to": { hours: 9, minutes: 0 }, "rooms": ["Zayed", "Mohandseen"], "code": "MS117", "name": "Monica WILSON", "hiddenFor": [], "color": "#26ACE3","lighterColor":"#d4eef9", "showOperation": true },
    { "id": 2, "from": { hours: 9, minutes: 0 }, "to": { hours: 12, minutes: 0 }, "rooms": ["Zayed"], "code": "Daste User Training", "name": "Mahmoud SHAABAN", "hiddenFor": [], "color": "#67B69A","lighterColor":"#e1f0eb", "showOperation": false },
    { "id":3,"from": { hours: 9, minutes: 45 }, "to": { hours: 12, minutes: 30 }, "rooms": ["Mohandseen"], "code": "Daste User Training", "name": "Mahmoud SHAABAN", "hiddenFor": [], "color": "#F5AF07","lighterColor":"#feefcd", "showOperation": true  },
    { "id":4,"from": { hours: 13, minutes: 0 }, "to": { hours: 14, minutes: 0 }, "rooms": ["Haram"], "code": "MS87", "name": "Noha NAGI", "hiddenFor": [], "color": "#DF66B0","lighterColor":"#f9e0ef", "showOperation": true },
    { "id":5,"from": { hours: 8, minutes: 45 }, "to": { hours: 11, minutes: 30 }, "rooms": ["Heliopolis","New Cairo"], "code": "Academy Shooting", "name": "Mohamed ADEL-ANWAR", "hiddenFor": [],"color": "#A97BB4","lighterColor":"#eee5f0", "showOperation": true },
    { "id":6,"from": { hours: 14, minutes: 0 }, "to": { hours: 15, minutes: 0 }, "rooms": ["October"], "code": "MS87", "name": "Noha NAGI", "hiddenFor": [], "color": "#DF66B0","lighterColor":"#f9e0ef", "showOperation": false },
    { "id":7,"from": { hours: 16, minutes: 0 }, "to": { hours: 17, minutes: 0 }, "rooms": ["Mohandseen"], "code": "MS117", "name": "Monica WILSON", "hiddenFor": [], "color": "#67B69A","lighterColor":"#e1f0eb", "showOperation": false },
    { "id":8,"from": { hours: 15, minutes: 0 }, "to": { hours: 18, minutes: 0 }, "rooms": ["Haram","Zamalek"], "code": "Academy Shooting", "name": "Mahmoud SHAABAN", "hiddenFor": [],"color": "#A97BB4","lighterColor":"#eee5f0", "showOperation": false },
    { "id": 9, "from": { hours: 18, minutes: 0 }, "to": { hours: 19, minutes: 0 }, "rooms": ["New Cairo"], "code": "MS117", "name": "Tamer EL-SHAEIR", "hiddenFor": [], "color": "#26ACE3","lighterColor":"#d4eef9", "showOperation": false },
    { "id":10,"from": { hours: 13, minutes: 0 }, "to": { hours: 16, minutes: 0 }, "rooms": ["Maadi"], "code": "Daste User Training", "name": "Mahmoud SHAABAN", "hiddenFor": [], "color": "#F5AF07","lighterColor":"#feefcd", "showOperation": false  },
    ];
  hours: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  rooms: string[] = ["Zayed", "October", "Mohandseen", "Haram", "Zamalek", "Maadi", "Heliopolis", "New Cairo"];

  hideFor: {} = {} //string : string 
  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.createForm();
    this.hideFor = this.setAdjacencyMap();
    this.bookings.forEach(booking => {
      this.setHiddenBasedOnAdjacency(booking);
    })
  }

  createForm() {
    this.bookRoomForm = this.formBuilder.group({
      fromHours: ['', Validators.required],
      fromMinutes: ['', Validators.required],
      toHours: ['', Validators.required],
      toMinutes: ['', Validators.required],
      rooms: this.formBuilder.array([]), // Assuming you want to dynamically add rooms
      code: ['', Validators.required],
      name: ['', Validators.required],
      roomName: ['']
    });
  }
  setAdjacencyMap() {
    let adjacencyMap: any = {};
    for (let i = 0; i < this.rooms.length; i++) {
      adjacencyMap[this.rooms[i]] = this.rooms[i + 1];
    }
    return adjacencyMap;
  }
  setHiddenBasedOnAdjacency(formData: BookRoom) {
    formData.rooms.forEach(room => {
      formData.hiddenFor.push(this.hideFor[room as keyof typeof this.hideFor])
    })
  }
  setExtend(time: number, roomName: string, id: number): number {
    const booking = this.getBooking(time, roomName).filter(booking => booking.id == id)[0];
    let counter = 1;
    for (let room of this.rooms) {
      if (room == roomName) {
        let bookedRoom = room;

        //hideFor object
        // {
        // "ZAYED" : "OCTOBER"
        // }
        while (true) {
          if (booking?.rooms.includes(this.hideFor[bookedRoom as keyof typeof this.hideFor])) {
            counter++;
            bookedRoom = this.hideFor[bookedRoom as keyof typeof this.hideFor];
          } else {
            break;
          }
        }
      }
    }

    return counter;
  }
  onSubmit() {
    if (this.bookRoomForm.valid) {
      const fromTime: Time = {
        hours: this.bookRoomForm.value.fromHours,
        minutes: this.bookRoomForm.value.fromMinutes
      }
      const toTime: Time = {
        hours: this.bookRoomForm.value.toHours,
        minutes: this.bookRoomForm.value.toMinutes
      }
      const formData: BookRoom = {
        id: this.bookings.length + 1,
        from: fromTime,
        to: toTime,
        rooms: this.bookRoomForm.value.rooms,
        code: this.bookRoomForm.value.code,
        name: this.bookRoomForm.value.name,
        hiddenFor: [],
        color: "",
        lighterColor: "",
        showOperation: false,
      };
      // Now you can use formData as needed, e.g., send it to a service for API call
      this.setHiddenBasedOnAdjacency(formData);
      this.bookings.push(formData);
      alert("added room successfuly !");
      this.bookRoomForm.reset();
      console.log(this.bookings)
    } else {
      // Handle form validation errors
      console.log("Form is invalid");
    }
  }

  addRoom() {
    // Get the value from the input field
    const roomName = this.bookRoomForm.get('roomName')!.value;
    // Add the room to the rooms array
    const roomsArray = this.bookRoomForm.get('rooms') as FormArray;
    roomsArray.push(this.formBuilder.control(roomName));
    // Clear the input field after adding the room
    this.bookRoomForm.get('roomName')?.reset();
  }
  // You can implement methods to dynamically add/remove rooms if needed

  getBooking(time: number, room: string): BookRoom[] {
    let bookedRooms: BookRoom[] = [];
    for (let booking of this.bookings) {
      if (booking.from.hours == time && booking.rooms.includes(room)) {
        bookedRooms.push(booking);
      }
    }
    return bookedRooms;
  }
  deleteBooking(bookingId: number) {
    this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
  }


  mouseYFromComponent: number = 0;
  mouseXFromComponent: number = 0;
  startWidth: number = 0;
  isDraggingToExtendTime = false;
  isDraggingToMove = false;
  draggingItemId: number = 0;
  height: number = 0;
  incrementTime(time: Time) {
    if (time.minutes < 45) {
      time.minutes += 15;
    } else {
      time.minutes = (time.minutes + 15) % 60;
      if (time.hours < 19) {
        time.hours++;
      }
    }
  }

  // Function to decrement time
  decrementTime(time: Time) {
    if (time.minutes >= 15) {
      time.minutes -= 15;
    } else {
      time.minutes = 45 + time.minutes; // Adjust minutes
      if (time.hours > 8) {
        time.hours--;
      }
    }
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDraggingToExtendTime) {
      if (Math.abs(this.mouseYFromComponent - event.pageY) >= 12.5) {
        if (event.pageY - this.mouseYFromComponent > 0) {
          this.incrementTime(this.bookings.filter(booking => booking.id == this.draggingItemId)[0].to);
        } else {
          this.decrementTime(this.bookings.filter(booking => booking.id == this.draggingItemId)[0].to);
        }
        this.mouseYFromComponent = event.pageY
      }
    }
    if (this.isDraggingToMove) {
      if (Math.abs(this.mouseYFromComponent - event.pageY) >= 12.5) {
        if (event.pageY - this.mouseYFromComponent > 0) {
          this.incrementTime(this.bookings.filter(booking => booking.id == this.draggingItemId)[0].to);
          this.incrementTime(this.bookings.filter(booking => booking.id == this.draggingItemId)[0].from);
        } else {
          this.decrementTime(this.bookings.filter(booking => booking.id == this.draggingItemId)[0].to);
          this.decrementTime(this.bookings.filter(booking => booking.id == this.draggingItemId)[0].from);
        }
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

  onMouseDownToExtend(event: DragEventExtendTime) {
    this.mouseYFromComponent = event.pageY;
    this.isDraggingToExtendTime = event.isDragging;
    this.draggingItemId = event.id;
    this.height = event.height;
  }
  onMouseDownToMove(event: DragEventExtendTime) {
      this.mouseYFromComponent = event.pageY;
      this.mouseXFromComponent = event.pageX;
    this.isDraggingToMove = event.isDragging;
    this.draggingItemId = event.id;
    this.height = event.height;
  }


}

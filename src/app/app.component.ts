import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from './interfaces/Reservation';
import { Setup } from './interfaces/setup';
import { Room } from './interfaces/Room';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'greater-cairo-room';
  bookRoomForm!: FormGroup;

  date: Date[] | undefined;
  bookings: Reservation[] = [
    { "id": 1, "date": "2024-02-14", "from": "8:00:00", "to": "9:00:00", "roomName": "Zayed", "name": "MS117", "requesterMail": "monica.wilson@valeo.com", "hiddenFor": [], roomSetup: "Training", guestsNumber: 55 },
    { "id": 2, "date": "2024-02-14", "from": "9:00:00", "to": "12:00:00", "roomName": "Zayed", "name": "Daste User Training", "requesterMail": "mahmoud.shaaban@valeo.com", "hiddenFor": [], roomSetup: "U-shape", guestsNumber: 55 },
    { "id": 3, "date": "2024-02-14", "from": "9:45:00", "to": "12:30:00", "roomName": "Mohandseen", "name": "Daste User Training", "requesterMail": "mahmoud.shaaban@valeo.com", "hiddenFor": [], roomSetup: "Workshop", guestsNumber: 55 },
    { "id": 4, "date": "2024-02-14", "from": "13:00:00", "to": "14:00:00", "roomName": "Haram", "name": "MS87", "requesterMail": "noha.nagi@valeo.com", "hiddenFor": [], roomSetup: "Theatre", guestsNumber: 55 },
    { "id": 5, "date": "2024-02-14", "from": "8:45:00", "to": "11:30:00", "roomName": "Heliopolis", "name": "Academy Shooting", "requesterMail": "mohamed.adel-anwar@valeo.com", "hiddenFor": [], roomSetup: "Event", guestsNumber: 55 },
    { "id": 6, "date": "2024-02-14", "from": "14:00:00", "to": "15:00:00", "roomName": "October", "name": "MS87", "requesterMail": "noha.nagi@valeo.com", "hiddenFor": [], roomSetup: "Theatre", guestsNumber: 55 },
    { "id": 7, "date": "2024-02-14", "from": "16:00:00", "to": "17:00:00", "roomName": "Mohandseen", "name": "MS117", "requesterMail": "monica.wilson@valeo.com", "hiddenFor": [], roomSetup: "U-shape", guestsNumber: 55 },
    { "id": 8, "date": "2024-02-14", "from": "15:00:00", "to": "18:00:00", "roomName": "Haram", "name": "Academy Shooting", "requesterMail": "mahmoud.shaaban@valeo.com", "hiddenFor": [], roomSetup: "Event", guestsNumber: 55 },
    { "id": 9, "date": "2024-02-14", "from": "18:00:00", "to": "19:00:00", "roomName": "New Cairo", "name": "MS117", "requesterMail": "Tamer EL-SHAEIR", "hiddenFor": [], roomSetup: "Training", guestsNumber: 55 },
    { "id": 10, "date": "2024-02-14", "from": "13:00:00", "to": "16:00:00", "roomName": "Maadi", "name": "Daste User Training", "requesterMail": "mahmoud.shaaban@valeo.com", "hiddenFor": [], roomSetup: "Workshop", guestsNumber: 55 },
  ];
  setup: Setup[] = [
    {
      id: 1,
      name: "Training",
      color: "#26ACE3",
      lighterColor: "#D3EEFA",
    },
    {
      id: 2,
      name: "Workshop",
      color: "#F5AF07",
      lighterColor: "#FDEFCD"
    },
    {
      id: 3,
      name: "Theatre",
      color: "#DF66B0",
      lighterColor: "#F9E0EF"
    },
    {
      id: 4,
      name: "U-shape",
      color: "#67B69A",
      lighterColor: "#E0F0EB"
    },
    {
      id: 5,
      name: "Event",
      color: "#A97BB4",
      lighterColor: "#EEE4F0"
    },
  ];
  rooms: Room[] = [{ id: 1, capacity: 55, setup: "Event", name: "Zayed" }, { id: 2, capacity: 55, setup: "Event", name: "October" }, { id: 3, capacity: 55, setup: "Event", name: "Mohandseen" }, { id: 4, capacity: 55, setup: "Event", name: "Haram" }, { id: 5, capacity: 55, setup: "Event", name: "Zamalek" }, { id: 6, capacity: 55, setup: "Event", name: "Maadi" }, { id: 7, capacity: 55, setup: "Event", name: "Heliopolis" }, { id: 8, capacity: 55, setup: "Event", name: "New Cairo" }];

  selectedTitles: string[] = [];
  constructor(private formBuilder: FormBuilder) {
  }
  onChange(title: string) {
    if (this.selectedTitles.includes(title)) {
      this.selectedTitles = this.selectedTitles.filter(t => t != title)
    } else {
      this.selectedTitles.push(title)
    }
  }

  ngOnInit(): void {
    this.createForm();
    
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
      category: ['', Validators.required],
      roomName: ['']
    });
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

  getChecked(title: string) {
    return this.selectedTitles.filter(t => t === title).length > 0
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  closeDialog() {
    console.log("CLOSING")
  }
}

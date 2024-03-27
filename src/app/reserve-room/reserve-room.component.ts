import { Component, Inject } from '@angular/core';
import { BookRoom } from '../interfaces/BookRoom';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-reserve-room',
  templateUrl: './reserve-room.component.html',
  styleUrls: ['./reserve-room.component.scss']
})
export class ReserveRoomComponent {
  constructor(
    public dialogRef: MatDialogRef<ReserveRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookRoom,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

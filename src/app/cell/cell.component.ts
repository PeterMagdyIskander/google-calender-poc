import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookRoom } from '../interfaces/BookRoom';
import { DragEventExtendTime } from '../interfaces/DragEventExtendTime';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() booking!: BookRoom | null;
  @Input() roomName!: string;
  @Input() extend: number = 1;
  @Input() division: number = 1;
  @Input() index: number = 1;
  @Input() color: String="";
  @Input() lighterColor: String="";
  @Input() showOperation: boolean=false;
  @Output() deleteBooking: EventEmitter<number> = new EventEmitter();
  @Output() extendTimeMouseDown: EventEmitter<DragEventExtendTime> = new EventEmitter();
  @Output() moveMouseDown: EventEmitter<DragEventExtendTime> = new EventEmitter();
  width: number = 0;
  height: number = 0;
  right: number = 0;
  top: number = 0;
  ngOnInit(): void {
    this.width = this.getWidth();
    this.right = this.getLeft();
    this.top = this.getTop();
    this.height = this.getHeight();
  }
  hide(): boolean {
    if (!this.booking) return true;
    return this.booking.hiddenFor.includes(this.roomName);
  }
  getHeight(): number {
    // (hours factor - top factor) + minutes factor                       8:15                                           11:15
    return (((this.booking!.to.hours - this.booking!.from.hours) * 50 - (this.booking!.from.minutes * (12.5 / 15)))) + (this.booking!.to.minutes * (12.5 / 15))
  }
  getWidth(): number {
    return ((this.extend * 125) - 10) * (1 / this.division);
  }
  getLeft(): number {
    return (this.division > 1) ? (((this.extend * 125)) * (1 / this.division)) * this.index : 0
  }
  getTop(): number {
    return this.booking!.from.minutes * (12.5 / 15);
  }
  extendDuration() {
    if (this.booking!.to.minutes < 45) {
      this.booking!.to.minutes += 15;
    } else {
      this.booking!.to.minutes = (this.booking!.to.minutes + 15) % 60;
      if (this.booking!.to.hours < 19) {
        this.booking!.to.hours++;
      }
    }
  }

  // Function to decrement  this.booking!.to
  decreaseDuration() {
    if (this.booking!.to.minutes >= 15) {
      this.booking!.to.minutes -= 15;
    } else {
      this.booking!.to.minutes = 45 + this.booking!.to.minutes; // Adjust minutes
      if (this.booking!.to.hours > 8) {
        this.booking!.to.hours--;
      }
    }
  }



  removeBooking() {
    this.deleteBooking.emit(this.booking!.id);
  }
  onMouseDownToExtend(event: MouseEvent) {
    let drag: DragEventExtendTime = {
      pageY: event.pageY,
      pageX:event.pageX,
      isDragging: true,
      id: this.booking!.id,
      height: this.getHeight(),
    }
    this.extendTimeMouseDown.emit(drag);
  }
  onMouseDownToMove(event: MouseEvent) {
    let drag: DragEventExtendTime = {
      pageY: event.pageY,
      pageX:event.pageX,
      isDragging: true,
      id: this.booking!.id,
      height: this.getHeight(),
    }
    this.moveMouseDown.emit(drag);
  }

}

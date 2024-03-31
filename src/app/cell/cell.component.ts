import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from '../interfaces/Reservation';
import { DragEventExtendTime } from '../interfaces/DragEventExtendTime';
import { Setup } from '../interfaces/setup';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() reservation!: Reservation | null;
  @Input() roomName!: string;
  @Input() extend: number = 1;
  @Input() division: number = 1;
  @Input() index: number = 1;
  @Input() setup: Setup[] = [];
  @Output() deleteReservation: EventEmitter<number> = new EventEmitter();
  @Output() extendTimeMouseDown: EventEmitter<DragEventExtendTime> = new EventEmitter();
  @Output() moveMouseDown: EventEmitter<DragEventExtendTime> = new EventEmitter();
  
  showInfo = false;
  selectedSetup!: Setup;
  constructor(private componentRef: ElementRef) { }
  ngOnInit(): void {
    this.selectedSetup = this.setup.filter(setup => setup.name === this.reservation!.roomSetup)[0];
  }
  hide(): boolean {
    if (!this.reservation) return true;
    return this.reservation.hiddenFor.includes(this.roomName);
  }
  getHeight(): number {
    let [toHours, toMinutes] = this.reservation!.to.split(":").map(Number);
    let [fromHours, fromMinutes] = this.reservation!.from.split(":").map(Number);
    // (hours factor - top factor) + minutes factor                       8:15                                           11:15
    return (((toHours - fromHours) * 50 - (fromMinutes * (12.5 / 15)))) + (toMinutes * (12.5 / 15))
  }
  getWidth(): number {
    return ((this.extend * 125)) * (1 / this.division);
  }
  getLeft(): number {
    return (this.division > 1) ? (((this.extend * 125)) * (1 / this.division)) * this.index : 0
  }
  getTop(): number {
    let [,fromMinutes,] = this.reservation!.from.split(":").map(Number);
    return fromMinutes * (12.5 / 15);
  }

  removeReservation() {
    this.deleteReservation.emit(this.reservation!.id);
  }
  onMouseDownToExtend(event: MouseEvent) {
    let drag: DragEventExtendTime = {
      pageY: event.pageY,
      isDragging: true,
      id: this.reservation!.id,
    }
    this.extendTimeMouseDown.emit(drag);
  }
  onMouseDownToMove(event: MouseEvent) {
    let drag: DragEventExtendTime = {
      pageY: event.pageY,
      isDragging: true,
      id: this.reservation!.id,
    }
    this.moveMouseDown.emit(drag);
  }
  handlePopup() {
    this.showInfo = !this.showInfo;
  }
}

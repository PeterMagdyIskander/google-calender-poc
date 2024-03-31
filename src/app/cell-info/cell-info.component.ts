import { Component, Input } from '@angular/core';
import { Reservation } from '../interfaces/Reservation';

@Component({
  selector: 'app-cell-info',
  templateUrl: './cell-info.component.html',
  styleUrls: ['./cell-info.component.scss']
})
export class CellInfoComponent {
    @Input() booking!: Reservation | null;
    @Input() color:string="";
    user:any;
    editingComment=false;
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

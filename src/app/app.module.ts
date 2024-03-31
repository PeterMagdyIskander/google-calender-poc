import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { ReserveRoomComponent } from './reserve-room/reserve-room.component';
import { CellInfoComponent } from './cell-info/cell-info.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    ReserveRoomComponent,
    CellInfoComponent,
    SchedulerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    DialogModule,
    CheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})

export class TripCardComponent {
  @Input() trip!: Trip;

  @Output() edit = new EventEmitter<Trip>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.trip);
  }

  onDelete() {
    this.delete.emit(this.trip.code);
  }
}


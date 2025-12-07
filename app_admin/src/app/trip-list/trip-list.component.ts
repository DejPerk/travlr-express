import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripDataService } from '../trip-data';
import { Trip } from '../trip';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TripCardComponent],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  trips: Trip[] = [];
  newTrip: Trip = this.emptyTrip();
  selectedTrip: Trip | null = null;
  isEditing = false;

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  emptyTrip(): Trip {
    return {
      code: '',
      name: '',
      length: '',
      start: '',
      resort: '',
      perPerson: '',
      image: '',
      description: '',
      price: 0,
      nights: 0
    };
  }

loadTrips(): void {
  this.tripDataService.getTrips().subscribe({
    next: trips => {
      console.log('Trips loaded:', trips.length, trips);
      this.trips = trips;
    },
    error: err => console.error('Error loading trips', err)
  });
}

  onAddTrip(): void {
    this.tripDataService.addTrip(this.newTrip).subscribe({
      next: () => {
        this.newTrip = this.emptyTrip();
        this.loadTrips();
      },
      error: err => console.error('Error adding trip', err)
    });
  }

  onEditTrip(trip: Trip): void {
    this.selectedTrip = { ...trip };
    this.isEditing = true;
  }

  onUpdateTrip(): void {
    if (!this.selectedTrip || !this.selectedTrip._id) { return; }

    this.tripDataService.updateTrip(this.selectedTrip._id, this.selectedTrip)
      .subscribe({
        next: () => {
          this.isEditing = false;
          this.selectedTrip = null;
          this.loadTrips();
        },
        error: err => console.error('Error updating trip', err)
      });
  }

  onDeleteTrip(code: string): void {
    if (!code) { return; }

    this.tripDataService.deleteTrip(code).subscribe({
      next: () => this.loadTrips(),
      error: err => console.error('Error deleting trip', err)
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedTrip = null;
  }
}


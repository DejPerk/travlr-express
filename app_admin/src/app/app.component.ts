import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TripListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travlr Admin';
}


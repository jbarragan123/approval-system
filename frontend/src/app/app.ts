import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  title = 'frontend';

  constructor(private router: Router) {}

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }
}
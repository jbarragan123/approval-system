import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  currentUser = 'juan.perez';

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications(this.currentUser).subscribe({
      next: data => this.notifications = data,
      error: err => console.error('Error loading notifications:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/requests']);
  }
}


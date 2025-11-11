import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './request-list.html',
  styleUrls: ['./request-list.css']
})
export class RequestListComponent implements OnInit {
  requests: any[] = [];

  constructor(private requestService: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getAll().subscribe({
      next: (data) => this.requests = data,
      error: (err) => console.error('Error loading requests:', err)
    });
  }

  goToDetail(id: string): void {
    this.router.navigate(['/requests', id]);
  }

  newRequest(): void {
    this.router.navigate(['/requests/new']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-detail.html',
  styleUrls: ['./request-detail.css']
})
export class RequestDetailComponent implements OnInit {
  request: any;
  id!: string;
  comment: string = ''; 
  history: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadRequest();
    this.requestService.getHistory(this.id).subscribe({
      next: data => this.history = data,
      error: err => console.error('Error loading history:', err)
    });
  }

  loadRequest(): void {
    this.requestService.getById(this.id).subscribe({
      next: (data) => (this.request = data),
      error: (err) => console.error('Error loading request:', err)
    });
  }

  updateStatus(status: 'APPROVED' | 'REJECTED'): void {
    if (!confirm(`¿Seguro que deseas marcar como ${status}?`)) return;

    this.requestService.updateStatus(this.id, {
      status,
      comment: this.comment  
    }).subscribe({
      next: () => {
        alert(`Solicitud ${status.toLowerCase()} correctamente`);
        this.router.navigate(['/requests']);
      },
      error: (err) => console.error('Error updating request:', err)
    });
  }


  goBack(): void {
    this.router.navigate(['/requests']);
  }
}

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
  processing = false; // indicador de carga

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadRequest();
    this.loadHistory();
  }

  loadRequest(): void {
    this.requestService.getById(this.id).subscribe({
      next: (data) => this.request = data,
      error: (err) => console.error('Error loading request:', err)
    });
  }

  loadHistory(): void {
    this.requestService.getHistory(this.id).subscribe({
      next: data => this.history = data,
      error: err => console.error('Error loading history:', err)
    });
  }

  updateStatus(status: 'APPROVED' | 'REJECTED'): void {
    if (!confirm(`¿Seguro que deseas marcar como ${status}?`)) return;

    this.processing = true;
    this.requestService.updateStatus(this.id, {
      status,
      comment: this.comment  
    }).subscribe({
      next: (updated) => {
        this.comment = '';
        this.processing = false;
        alert(`Solicitud ${status.toLowerCase()} correctamente`);
        this.router.navigate(['/requests']); // <-- redirige al listado
      },
      error: (err) => {
        console.error('Error updating request:', err);
        this.processing = false;
        alert('Error al actualizar la solicitud. Intenta nuevamente.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/requests']);
  }
}

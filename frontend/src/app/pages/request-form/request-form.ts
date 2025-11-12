import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-form.html',
  styleUrls: ['./request-form.css']
})
export class RequestFormComponent {
  request = {
    title: '',
    description: '',
    requester: '',
    approver: '',
    type: '',
  };

  approvers = [
    { username: 'juan.perez', name: 'Juan Pérez' },
    { username: 'maria.gomez', name: 'María Gómez' },
    { username: 'carlos.ruiz', name: 'Carlos Ruiz' }
  ];
  requesters = [
    { username: 'carlos.gonzales', name: 'Carlos Gonzales' },
    { username: 'pedro.smith', name: 'Pedro Smith' },
    { username: 'tatiana.parra', name: 'Tatiana Parra' }
  ];

  constructor(private requestService: RequestService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      alert('Por favor completa todos los campos obligatorios correctamente.');
      return;
    }

    this.requestService.create(this.request).subscribe({
      next: () => {
        alert('Solicitud creada correctamente');
        this.router.navigate(['/requests']);
      },
      error: (err) => {
        console.error('Error creating request:', err);
        alert('Error al crear la solicitud. Intenta nuevamente.');
      }
    });
  }
}

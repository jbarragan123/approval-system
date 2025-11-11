import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(private requestService: RequestService, private router: Router) {}

  onSubmit(): void {
    console.log("este es el objeto",this.request);
    this.requestService.create(this.request).subscribe({
      next: () => {
        alert('Request created successfully!');
        this.router.navigate(['/requests']);
      },
      error: (err) => {
        console.error('Error creating request:', err);
        alert('Error creating request');
      }
    });
  }
}

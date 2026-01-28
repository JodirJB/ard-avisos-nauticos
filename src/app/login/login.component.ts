import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  // Aquí iría la lógica de autenticación futura
  login() {
    console.log("Iniciando sesión...");

    this.authService.login('usuarioEjemplo', 'contraseñaEjemplo').subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        alert('Inicio de sesión exitoso');
      },
      error: (error) => {
        console.error('Error de inicio de sesión:', error);
        alert('Error de inicio de sesión');
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMaskModule } from 'angular-imask';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IMaskModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      IDCard: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Aquí iría la lógica de autenticación futura
  login() {
    console.log("Iniciando sesión...");

    this.authService.login(this.loginFormGroup.value.IDCard, this.loginFormGroup.value.password).subscribe({
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
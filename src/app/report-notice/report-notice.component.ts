import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-report-notice',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, FooterComponent, MatIconModule, MatButtonModule],
  templateUrl: './report-notice.component.html',
  styleUrl: './report-notice.component.scss'
})
export class ReportNoticeComponent {
  
  // Función simulada para usar ubicación
  useMyLocation() {
    console.log("Obteniendo GPS...");
  }

  // Función simulada de envío
  onSubmit() {
    console.log("Formulario enviado");
  }
}
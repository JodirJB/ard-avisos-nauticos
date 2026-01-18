import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { ReportNoticeForm } from './report-notice.form';
import { latitudeValidator, longitudeValidator } from '../validators/geo.validators';
import { ReportNotice } from './report-notice.interfaces';
import { ReportNoticeService } from './report-notice.service';

@Component({
  selector: 'app-report-notice',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, IMaskModule, FooterComponent, MatIconModule, MatButtonModule],
  templateUrl: './report-notice.component.html',
  styleUrls: ['./report-notice.component.scss']
})
export class ReportNoticeComponent implements OnInit {
  reportNoticeFormGroup!: FormGroup<ReportNoticeForm>;
  reportNoticeForm: ReportNotice[] = [];

  constructor( private fb: FormBuilder, private reportNoticeService: ReportNoticeService ) { }

  get dateReceipt() {
    return this.reportNoticeFormGroup.controls['dateReceipt'];
  }

  get dateSubmission() {
    return this.reportNoticeFormGroup.controls['dateSubmission'];
  }

  get typesNotices() {
    return this.reportNoticeFormGroup.controls['typesNotices'];
  }

  get nauticalChartNumber() {
    return this.reportNoticeFormGroup.controls['nauticalChartNumber'];
  }

  get source() {
    return this.reportNoticeFormGroup.controls['source'];
  }

  get latitude() {
    return this.reportNoticeFormGroup.controls['latitude'];
  }

  get longitude() {
    return this.reportNoticeFormGroup.controls['longitude'];
  }

  get detailsAnomaly() {
    return this.reportNoticeFormGroup.controls['detailsAnomaly'];
  }

  ngOnInit(): void {
    this.reportNoticeFormGroup = this.fb.nonNullable.group({
      dateReceipt: ['', Validators.required],
      dateSubmission: ['', Validators.required],
      typesNotices: ['', Validators.required],
      nauticalChartNumber: [0, Validators.required],
      source: ['', Validators.required],
      email: ['', Validators.email],
      contactPhone: [''],
      numberAndTitle: [''],
      latitude: ['', [Validators.required, latitudeValidator]],
      longitude: ['', [Validators.required, longitudeValidator]],
      detailsAnomaly: ['', Validators.required],
      attachedDocuments: ['']
    });

    console.log('reportNoticeFormGroup:', this.reportNoticeFormGroup.value);
  }

  // Función simulada para usar ubicación
  useMyLocation() {
    console.log("Obteniendo GPS...");

    if (!navigator.geolocation) {
      alert('La geolocalización no está soportada por este navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('Lat:', latitude, 'Lng:', longitude);

        // Asignar al formulario
        this.reportNoticeFormGroup.patchValue({
          latitude: latitude.toString(),
          longitude: longitude.toString()
        });
      },
      (error) => {
        this.handleLocationError(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  private handleLocationError(error: GeolocationPositionError): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('Permiso de ubicación denegado');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Ubicación no disponible');
        break;
      case error.TIMEOUT:
        alert('Tiempo de espera agotado');
        break;
      default:
        alert('Error desconocido al obtener ubicación');
    }
  }

  // Función simulada de envío
  sendReport() {
    console.log("Formulario enviado");

    const sendReportForm = {
      ...this.reportNoticeFormGroup.value
    }

    this.reportNoticeService.create(sendReportForm).subscribe((response) => {
      console.log('Reporte enviado con éxito:', response);
      alert('Reporte enviado con éxito');
      this.reportNoticeFormGroup.reset();
    }, (error) => {
      console.error('Error al enviar el reporte:', error);
      alert('Error al enviar el reporte');
    });
  }
}
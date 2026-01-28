import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { ReportNoticeForm } from './report-notice.form';
import { latitudeValidator, longitudeValidator } from '../../validators/geo.validators';
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
  
  // 1. NUEVO: Variable para almacenar el archivo real (Binario)
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private reportNoticeService: ReportNoticeService) { }

  // --- GETTERS (Se mantienen igual) ---
  get dateReceipt() { return this.reportNoticeFormGroup.controls['dateReceipt']; }
  get dateSubmission() { return this.reportNoticeFormGroup.controls['dateSubmission']; }
  get typesNotices() { return this.reportNoticeFormGroup.controls['typesNotices']; }
  get nauticalChartNumber() { return this.reportNoticeFormGroup.controls['nauticalChartNumber']; }
  get source() { return this.reportNoticeFormGroup.controls['source']; }
  get latitude() { return this.reportNoticeFormGroup.controls['latitude']; }
  get longitude() { return this.reportNoticeFormGroup.controls['longitude']; }
  get detailsAnomaly() { return this.reportNoticeFormGroup.controls['detailsAnomaly']; }

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
      attachedDocuments: [''] // Esto solo guardará un string referencial
    });

    console.log('reportNoticeFormGroup:', this.reportNoticeFormGroup.value);
  }

  // 2. NUEVO: Lógica para Capturar el Archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Actualizamos el form control solo para que Angular sepa que el campo "se tocó"
      this.reportNoticeFormGroup.patchValue({ attachedDocuments: 'file_selected' });
    }
  }

  // 3. NUEVO: Lógica para Eliminar el Archivo
  removeFile() {
    this.selectedFile = null;
    this.reportNoticeFormGroup.patchValue({ attachedDocuments: '' });
    
    // Opcional: Limpiar el input file del DOM si fuera necesario, 
    // pero el @if del HTML se encarga de ocultarlo/recrearlo.
  }

  // --- GEOLOCALIZACIÓN (Se mantiene igual) ---
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

  // 4. ACTUALIZADO: Enviar Reporte usando FormData
  sendReport() {
    // Verificar validez antes de enviar
    if (this.reportNoticeFormGroup.invalid) {
      this.reportNoticeFormGroup.markAllAsTouched();
      return;
    }

    console.log("Preparando envío...");

    // IMPORTANTE: Creamos un FormData. Esto es obligatorio para subir archivos.
    const formData = new FormData();
    const formValue = this.reportNoticeFormGroup.getRawValue();

    // Agregamos todos los campos de texto al FormData
    Object.keys(formValue).forEach(key => {
      // Ignoramos 'attachedDocuments' porque agregaremos el archivo real manualmente abajo
      if (key !== 'attachedDocuments') {
        const value = formValue[key as keyof typeof formValue];
        // Convertimos a string para asegurar compatibilidad, o cadena vacía si es null
        formData.append(key, value !== null && value !== undefined ? value.toString() : '');
      }
    });

    // Agregamos el archivo real si existe
    if (this.selectedFile) {
      formData.append('attachedDocuments', this.selectedFile);
    }

    console.log("FormData preparado para envío:", formData);
    console.log("FormValue preparado para envío:", formValue);

    // Llamamos al servicio pasando el FormData
    // Nota: Tu servicio debe esperar 'any' o 'FormData', no la interfaz 'ReportNotice' estricta si esta no soporta FormData.
    this.reportNoticeService.create(formValue).subscribe({
      next: (response) => {
        console.log('Reporte enviado con éxito:', response);
        alert('Reporte enviado con éxito');
        this.reportNoticeFormGroup.reset();
        this.selectedFile = null; // Limpiamos el archivo seleccionado
      },
      error: (error) => {
        console.error('Error al enviar el reporte:', error);
        alert('Error al enviar el reporte');
      }
    });
  }
}
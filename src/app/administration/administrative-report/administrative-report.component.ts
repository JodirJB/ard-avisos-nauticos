import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministrativeReport } from './administrative-report.interface';
import { AdministrativeReportForm } from './administrative-report.form';
import { latitudeValidator, longitudeValidator } from '../../validators/geo.validators';
import { AdministrativeReportService } from './administrative-report.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../footer/footer.component';
import { ToolbarComponent } from '../../toolbar/toolbar.component';

@Component({
  selector: 'app-administrative-report',
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, FooterComponent, MatIconModule, MatButtonModule],
  templateUrl: './administrative-report.component.html',
  styleUrls: ['./administrative-report.component.scss']
})
export class AdministrativeReportComponent implements OnInit {
  administrationFormGroup!: FormGroup<AdministrativeReportForm>;
  administrationForm: AdministrativeReport[] = [];

  constructor( private fb: FormBuilder, private administrationService: AdministrativeReportService ) { }

  get no() {
    return this.administrationFormGroup.controls['no'];
  }

  get date() {
    return this.administrationFormGroup.controls['date'];
  }

  get area() {
    return this.administrationFormGroup.controls['area'];
  }

  get locality() {
    return this.administrationFormGroup.controls['locality'];
  }

  get detail() {
    return this.administrationFormGroup.controls['detail'];
  }

  get description() {
    return this.administrationFormGroup.controls['description'];
  }

  get latitude() {
    return this.administrationFormGroup.controls['latitude'];
  }

  get longitude() {
    return this.administrationFormGroup.controls['longitude'];
  }

  get observations() {
    return this.administrationFormGroup.controls['observations'];
  }

  get recommendationsNavigator() {
    return this.administrationFormGroup.controls['recommendationsNavigator'];
  }

  get source() {
    return this.administrationFormGroup.controls['source'];
  }

  get preparedBy() {
    return this.administrationFormGroup.controls['preparedBy'];
  }

  ngOnInit(): void {
    this.administrationFormGroup = this.fb.nonNullable.group({
      no: ['', Validators.required],
      date: ['', Validators.required],
      area: ['', Validators.required],
      locality: ['', Validators.required],
      detail: ['', Validators.required],
      description: ['', Validators.required],
      latitude: ['', [Validators.required, latitudeValidator]],
      longitude: ['', [Validators.required, longitudeValidator]],
      observations: ['', Validators.required],
      recommendationsNavigator: ['', Validators.required],
      source: ['', Validators.required],
      preparedBy: ['', Validators.required],
    });
  }

  sendReport() {
    console.log("Formulario enviado");

    const sendAdminForm = {
      ...this.administrationFormGroup.value
    }

    this.administrationService.create(sendAdminForm).subscribe((response) => {
      console.log('Administración enviada:', response);
      this.administrationFormGroup.reset();
    }, (error) => {
      console.error('Error al enviar el reporte:', error);
      alert('Error al enviar el reporte');
    });
  }
}

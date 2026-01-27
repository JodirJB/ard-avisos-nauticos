import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NauticalNoticesBoard } from '../interface/nauticalnoticesboard.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportNoticeService } from '../client/report-notice/report-notice.service';
import { AdministrativeReportService } from '../administration/administrative-report/administrative-report.service';

@Component({
  selector: 'app-nautical-notice-board',
  imports: [
    CommonModule, 
    MatTableModule, 
    FormsModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatIconModule
  ],
  templateUrl: './nautical-notice-board.component.html',
  styleUrl: './nautical-notice-board.component.scss'
})
export class NauticalNoticeBoardComponent implements OnInit, AfterViewInit {
  nauticalNoticesClients: NauticalNoticesBoard[] = [];
  nauticalNoticesAdmin: NauticalNoticesBoard[] = [];

  displayedColumns: string[] = ['number', 'date', 'zone', 'detail', 'see'];
  dataSource = new MatTableDataSource<NauticalNoticesBoard>(this.nauticalNoticesClients);

  // === DATOS DE LOS FILTROS ===
  years: number[] = [2024, 2025, 2026];
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  // === LÓGICA NUEVA PARA MULTI-SELECT ===
  
  // Variables para saber si el menú está abierto o cerrado
  isOpenYear = false;
  isOpenMonth = false;
  isAdministrativeRoute = false;

  // Arrays para guardar las selecciones múltiples (ej: [2024, 2026])
  selectedYears: number[] = [];
  selectedMonths: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private reportNoticeService: ReportNoticeService,
    private administrativeReportService: AdministrativeReportService
  ) {}

  ngOnInit(): void {
    // Verificar si la ruta actual es administrative-nautical-notices
    this.activatedRoute.url.subscribe((urlSegments) => {
      const route = urlSegments.map(s => s.path).join('/');
      this.isAdministrativeRoute = route.includes('administrative-nautical-notices');
    });

    this.reportNoticeService.getAll().subscribe((data) => {
      this.nauticalNoticesClients = data;
      this.dataSource.data = this.nauticalNoticesClients;
      console.log('nauticalNoticesClients:', this.nauticalNoticesClients);
    });

    this.administrativeReportService.getAll().subscribe((data) => {
      this.nauticalNoticesAdmin = data;
      this.dataSource.data = this.nauticalNoticesAdmin;
      console.log('nauticalNoticesAdmin:', this.nauticalNoticesAdmin);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('Data source:', this.dataSource.data);
  }

  showDetails(id: number) {
    console.log('Navegar a los detalles del aviso con ID:', id);
    this.router.navigate(['/details', id]);
  }

  // === FUNCIONES PARA CONTROLAR LOS DROPDOWNS NUEVOS ===

  // 1. Abrir/Cerrar menú de Años
  toggleYearDropdown() {
    this.isOpenYear = !this.isOpenYear;
    this.isOpenMonth = false; // Cierra el de meses si abres el de años
  }

  // 2. Seleccionar/Deseleccionar un año
  toggleYearSelection(year: number) {
    const index = this.selectedYears.indexOf(year);
    if (index >= 0) {
      this.selectedYears.splice(index, 1); // Si ya estaba, lo quita
    } else {
      this.selectedYears.push(year); // Si no estaba, lo agrega
    }
  }

  // 3. Abrir/Cerrar menú de Meses
  toggleMonthDropdown() {
    this.isOpenMonth = !this.isOpenMonth;
    this.isOpenYear = false; // Cierra el de años si abres el de meses
  }

  // 4. Seleccionar/Deseleccionar un mes
  toggleMonthSelection(month: string) {
    const index = this.selectedMonths.indexOf(month);
    if (index >= 0) {
      this.selectedMonths.splice(index, 1);
    } else {
      this.selectedMonths.push(month);
    }
  }

  // 5. Cerrar todo (al hacer clic fuera)
  closeAllDropdowns() {
    this.isOpenYear = false;
    this.isOpenMonth = false;
  }
}
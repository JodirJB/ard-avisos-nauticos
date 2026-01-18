import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- NECESARIO para las clases dinámicas
import { Router } from '@angular/router';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReportNoticeService } from '../report-notice/report-notice.service';

export interface UserData {
  number: any;
  date: string;
  zone: any;
  detail: string;
  see: string;
}

const ELEMENT_DATA: UserData[] = [
  {number: 1, date: 'Hydrogen', zone: 1.0079, detail: 'H', see: ''},
  {number: 2, date: 'Helium', zone: 4.0026, detail: 'He', see: ''},
  {number: 3, date: 'Lithium', zone: 6.941, detail: 'Li', see: ''},
  {number: 4, date: 'Beryllium', zone: 9.0122, detail: 'Be', see: ''},
  {number: 5, date: 'Boron', zone: 10.811, detail: 'B', see: ''},
  {number: 6, date: 'Carbon', zone: 12.0107, detail: 'C', see: ''},
  {number: 7, date: 'Nitrogen', zone: 14.0067, detail: 'N', see: ''},
  {number: 8, date: 'Oxygen', zone: 15.9994, detail: 'O', see: ''},
  {number: 9, date: 'Fluorine', zone: 18.9984, detail: 'F', see: ''},
  {number: 10, date: 'Neon', zone: 20.1797, detail: 'Ne', see: ''},
];

@Component({
  selector: 'app-nautical-notices',
  standalone: true,
  // Agregamos CommonModule aquí para que funcione el HTML nuevo
  imports: [
    CommonModule, 
    ToolbarComponent, 
    FooterComponent, 
    MatTableModule, 
    FormsModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatIconModule
    // Nota: Ya no necesitamos MatSelectModule ni MatFormFieldModule para los filtros nuevos
  ],
  templateUrl: './nautical-notices.component.html',
  styleUrl: './nautical-notices.component.scss'
})
export class NauticalNoticesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['number', 'date', 'zone', 'detail', 'see'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);

  // === DATOS DE LOS FILTROS ===
  years: number[] = [2024, 2025, 2026];
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  // === LÓGICA NUEVA PARA MULTI-SELECT ===
  
  // Variables para saber si el menú está abierto o cerrado
  isOpenYear = false;
  isOpenMonth = false;

  // Arrays para guardar las selecciones múltiples (ej: [2024, 2026])
  selectedYears: number[] = [];
  selectedMonths: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private reportNoticeService: ReportNoticeService) {}

  ngOnInit(): void {
    this.reportNoticeService.getAll().subscribe((data) => {
      console.log('Datos recibidos del servicio:', data);
    });
  }

  ngAfterViewInit() {
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
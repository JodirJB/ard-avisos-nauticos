import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

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
  imports: [ToolbarComponent, FooterComponent, MatTableModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './nautical-notices.component.html',
  styleUrl: './nautical-notices.component.scss'
})
export class NauticalNoticesComponent implements AfterViewInit {
  // displayedColumns: string[] = ['number', 'date', 'zone', 'detail', 'see'];
  displayedColumns: string[] = ['number', 'date', 'zone', 'detail', 'see'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);

  // Variables para los filtros
  years: number[] = [2024, 2025, 2026];
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  selectedYear: number | null = null;
  selectedMonth: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;

    console.log('Data source:', this.dataSource.data);
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  showDetails(id: number) {
    console.log('Navegar a los detalles del aviso con ID:', id);
    this.router.navigate(['/details', id]);
  }
}

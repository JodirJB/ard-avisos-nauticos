import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NauticalNoticeBoardComponent } from '../../nautical-notice-board/nautical-notice-board.component';

@Component({
  selector: 'app-nautical-notices',
  standalone: true,
  imports: [
    CommonModule,  
    MatTableModule, 
    FormsModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatIconModule,
    ToolbarComponent, 
    FooterComponent,
    NauticalNoticeBoardComponent
  ],
  templateUrl: './nautical-notices.component.html',
  styleUrl: './nautical-notices.component.scss'
})
export class NauticalNoticesComponent {
}
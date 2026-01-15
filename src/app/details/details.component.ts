import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, FooterComponent, MatIconModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  
  noticeId: string | null = null;

  // Datos EXACTOS de tu imagen de referencia
  notice = {
    number: '001-2025',
    date: '15/05/2025',
    zone: 'Sur',
    latitude: '18°27\'51.32" (N)',
    longitude: '69°52\'34.30" (W)',
    locality: 'Punta Torrecilla, Sans Soucí, Santo Domingo Este, RD.',
    observations: 'Tomar las medidas de seguridad, debido a la avería del faro de Punta Torrecilla.',
    description: 'La luz del citado faro no está emitiendo destellos, encontrándose totalmente apagado, por lo que puede representar un peligro para los navegantes durante la noche.',
    recommendations: 'Se les recomienda a las embarcaciones que transitan por esta zona, navegar con precaución en las inmediaciones de Punta Torrecilla, Santo Domingo, puntualmente durante la noche, no tomando como referencia nocturna las orientaciones de este faro.',
    source: 'División de Operaciones Navales, ARD.',
    authoredBy: 'Departamento de Avisos Náuticos, ARD.',
    // Aquí pondrás la ruta real de tu mapa
    mapImage: '/imgs/map-placeholder.png' 
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location 
  ) {}

  ngOnInit() {
    this.noticeId = this.route.snapshot.paramMap.get('id');
    // Aquí cargarías los datos reales basados en el ID
    if (this.noticeId) {
       // Lógica de carga...
    }
  }

  goBack() {
    this.location.back();
  }
}
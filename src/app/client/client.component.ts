import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';
import { FooterComponent } from '../footer/footer.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-client',
  imports: [ToolbarComponent, FooterComponent, CarouselComponent, MatButtonModule, RouterModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}

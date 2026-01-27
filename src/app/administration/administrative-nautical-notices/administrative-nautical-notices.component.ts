import { Component } from '@angular/core';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { NauticalNoticeBoardComponent } from '../../nautical-notice-board/nautical-notice-board.component';

@Component({
  selector: 'app-administrative-nautical-notices',
  imports: [ToolbarComponent, FooterComponent, NauticalNoticeBoardComponent],
  templateUrl: './administrative-nautical-notices.component.html',
  styleUrl: './administrative-nautical-notices.component.scss'
})
export class AdministrativeNauticalNoticesComponent {

}

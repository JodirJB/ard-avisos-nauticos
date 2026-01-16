import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-report-notice',
  imports: [ToolbarComponent, FooterComponent],
  templateUrl: './report-notice.component.html',
  styleUrl: './report-notice.component.scss'
})
export class ReportNoticeComponent {

}

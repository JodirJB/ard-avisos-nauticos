import { FormControl } from '@angular/forms';

export type ReportNoticeForm = {
  dateReceipt: FormControl<string>;
  dateSubmission: FormControl<string>;
  typesNotices: FormControl<string>;
  other: FormControl<string>;
  nauticalChartNumber: FormControl<number>;
  source: FormControl<string>;
  email: FormControl<string>;
  contactPhone: FormControl<string>;
  nauticalChartTitle: FormControl<string>;
  latitude: FormControl<string>;
  longitude: FormControl<string>;
  detailsAnomaly: FormControl<string>;
  attachedDocuments: FormControl<string>;
};

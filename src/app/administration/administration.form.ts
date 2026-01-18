import { FormControl } from '@angular/forms';

export type AdministrationForm = {
  no: FormControl<string>;
  date: FormControl<string>;
  area: FormControl<string>;
  locality: FormControl<string>;
  detail: FormControl<string>;
  description: FormControl<string>;
  latitude: FormControl<string>;
  longitude: FormControl<string>;
  observations: FormControl<string>;
  recommendationsNavigator: FormControl<string>;
  source: FormControl<string>;
  preparedBy: FormControl<string>;
};
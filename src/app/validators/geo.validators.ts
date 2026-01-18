import { AbstractControl, ValidationErrors } from '@angular/forms';

export function latitudeValidator(control: AbstractControl): ValidationErrors | null {
  const value = Number(control.value);

  if (isNaN(value)) return { latitudeInvalid: true };
  if (value < -90 || value > 90) return { latitudeOutOfRange: true };

  return null;
}

export function longitudeValidator(control: AbstractControl): ValidationErrors | null {
  const value = Number(control.value);

  if (isNaN(value)) return { longitudeInvalid: true };
  if (value < -180 || value > 180) return { longitudeOutOfRange: true };

  return null;
}

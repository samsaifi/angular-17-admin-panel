import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TrimValidator {
    static validate(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value.trim() === '') {
            return {
                trim: true,
            };
        }
        return null;
    }
}

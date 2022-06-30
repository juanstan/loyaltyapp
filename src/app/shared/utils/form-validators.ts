import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormControlValidators {
  static requiredInput(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const value = String(control.value.trim());
      
      return value ? null : { required: true };
    };
  }
  
  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (String(control.value.trim()).length > maxLength) {
        return {
          maxLength: true
        };
      }
      return null;
    };
  }
  
  static match(firstControlName, secondControlName): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } | null => {
      const firstControlValue = group.controls[firstControlName].value; // to get value in input tag
      const secondControlValue = group.controls[secondControlName].value; // to get value in input tag
      
      // @ts-ignore
      return firstControlValue === secondControlValue ? null : { MatchFields: true };
    };
  }
}

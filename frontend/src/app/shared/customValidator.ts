import { AbstractControl, ValidatorFn } from '@angular/forms';

function customValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

function passwordValidator(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');
  if (password.pristine || confirmPassword.pristine) return null;
  return password && confirmPassword && password.value != confirmPassword.value ? { misMatch: true } : null;
}

function passwordDiff(control: AbstractControl): { [key: string]: any } | null {
  const oldPassword = control.get('oldPassword');
  const newPassword = control.get('newPassword');
  if (oldPassword.pristine || newPassword.pristine) return null;
  return oldPassword && newPassword && oldPassword.value == newPassword.value ? { match: true } : null;
}

function relationValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let superArr: Array<Number> = [];
    if (control?.get('person_id')?.value && Number(control?.get('person_id')?.value) !== 0) {
      superArr.push(Number(control?.get('person_id')?.value));
    }
    if (control?.get('father_id')?.value && Number(control?.get('father_id')?.value) !== 0) {
      superArr.push(Number(control?.get('father_id')?.value));
    }
    if (control?.get('mother_id')?.value && Number(control?.get('mother_id')?.value) !== 0) {
      superArr.push(Number(control?.get('mother_id')?.value));
    }
    if (control?.get('spouse_id')?.value && Number(control?.get('spouse_id')?.value) !== 0) {
      superArr.push(Number(control?.get('spouse_id')?.value));
    }
    let childrenArr = control?.get('children_id')?.value;
    childrenArr.forEach((element: any) => {
      if (element !== 0) superArr.push(Number(element));
    });
    if (superArr.length === new Set(superArr).size) return null;

    return { mismatch: true };
  };
}

function leapyear(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

function customDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let day = control.get('dayOfBirth')?.value;
    let month = Number(control.get('monthOfBirth')?.value);
    let year = control.get('yearOfBirth')?.value;
    if (day && month && year) {
      let longMonth: Array<number> = [1, 3, 5, 7, 8, 10, 12];
      let shortMonth: Array<number> = [4, 6, 9, 11];
      if (longMonth.includes(month)) {
        return null;
      } else if (shortMonth.includes(month)) {
        if (day > 30) {
          return { dayError: 'Day cannot be greater than 30' };
        }
        return null;
      } else {
        if (leapyear(year)) {
          if (day > 29) {
            return { dayError: 'Day cannot be greater than 29' };
          }
        } else {
          if (day > 28) {
            return { dayError: 'Day cannot be greater than 28' };
          }
        }
      }
      return null;
    }
  };
}

export { customValidator, passwordValidator, passwordDiff, relationValidator, customDateValidator };

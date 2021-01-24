import { FormControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: FormControl): { customEmail: boolean } | null => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { value } = control;

    if (value && !value.match(emailRegex)) {
      return { customEmail: true };
    }

    return null;
  };
}

export function strongPasswordValdiator(): ValidatorFn {
  return (control: FormControl): { strongPassword: boolean } | null => {
    const strongPasswordRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@\-_#$%^&*])[\w!@\-_#$%^&*]{8,}$/;
    const { value } = control;

    if (value && !value.match(strongPasswordRegex)) {
      return { strongPassword: true };
    }

    return null;
  };
}

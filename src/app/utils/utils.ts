import { HttpHeaders } from '@angular/common/http';
import { HttpHeadersEnum } from '@models/http-headers.enum';

export const getIdByUrl = (url: string) => {
  return url.split('/').slice(-2)[0];
};

export const createHeaders = (spinner: boolean): HttpHeaders => {
  let headers = new HttpHeaders();

  if (!spinner) {
    headers = headers.append(HttpHeadersEnum.NO_SPINNER, 'true');
  }

  return headers;
};

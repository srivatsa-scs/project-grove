import { Injectable, PACKAGE_ROOT_URL } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InfoGetterService {
  constructor(private _http: HttpClient) {}

  baseurl: String = environment.serverURL;

  /* Person Methods */

  /* Form Component - Uploads Form Data */

  public addPerson(userData) {
    const url = this.baseurl + '/person/add';
    const body = {
      value: userData,
    };
    return this._http.post<any>(url, body);
  }

  /* Form Component - Uploads Image */

  public uploadImage(userData) {
    const url = this.baseurl + '/person/image/upload';
    return this._http.post<any>(url, userData);
  }

  /* View, Newrelation, Relation Components - Gets All Person userData */

  public getPersonAll() {
    const url = this.baseurl + '/person/get/all';
    const body = {};
    return this._http.post<any>(url, body);
  }

  public updatePerson(userData) {
    const url = this.baseurl + '/person/update/one';
    const body = {
      value: userData,
    };
    return this._http.post<any>(url, body);
  }

  public getOnePerson(userData) {
    const url = this.baseurl + '/person/find/one';
    const body = {
      value: userData,
    };
    return this._http.post<any>(url, body);
  }

  /* Relation Methods */

  public getAllRelations(userData) {
    const url = this.baseurl + '/relations/find/all';
    const body = {
      value: userData,
    };
    return this._http.post<any>(url, body);
  }

  /* Update Relations */

  public setRelations(userData) {
    const url = this.baseurl + '/relations/update/one';
    const body = {
      value: userData,
    };
    return this._http.post<any>(url, body);
  }

  /* Get Relation Info about one person */

  public getOneRelations(userData) {
    const url = this.baseurl + '/relations/find/one';
    const body = {
      value: userData,
    };
    return this._http.post<any>(url, body);
  }

  public getRelationBetween(userData) {
    const url = this.baseurl + '/relations/between';
    const body = {
      value: userData,
    };
    return this._http.post<any>(url, body);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Version } from '../models/version';
import { Observable, Subject } from 'rxjs';
import { QuantityVersionDTO } from '../models/quantityVersionDTO';
import { AmountVersionDTO } from './../models/amountVersionDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class VersionService {
  private url = `${base_url}/versiones`;
  private listaCambio = new Subject<Version[]>();

  constructor(private h: HttpClient) {}

  list() {
    return this.h.get<Version[]>(`${this.url}/nombres`);
  }
  insert(v: Version) {
    return this.h.post(`${this.url}/inserciones`, v);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Version[]) {
    this.listaCambio.next(listaNueva);
  }
  getQuantityByVersion(): Observable<QuantityVersionDTO[]> {
    return this.h.get<QuantityVersionDTO[]>(`${this.url}/cantidades`);
  }
  getSum(): Observable<AmountVersionDTO[]> {
    return this.h.get<AmountVersionDTO[]>(`${this.url}/sumas`);
  }
}

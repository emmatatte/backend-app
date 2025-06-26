import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Aplicacion } from '../models/aplicacion';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AplicacionService {
  private url = `${base_url}/aplicaciones`;
  private listaCambio = new Subject<Aplicacion[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Aplicacion[]>(this.url);
  }

  insert(a: Aplicacion) {
    return this.http.post(this.url, a);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Aplicacion[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Aplicacion>(`${this.url}/${id}`)
  }
  update(a: Aplicacion) {
    return this.http.put(this.url, a)
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  
  searchType(tipo:string){
    const params={ti:tipo}
    return this.http.get<Aplicacion[]>(`${this.url}/busquedas`,{params})
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Shipment } from '../types/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = 'http://localhost:4000/shipments';

  constructor(private http: HttpClient) {}

  getShipments(filters: any): Observable<{shipments: Shipment[], total: number, page:number, limit:number}> {
    let params = new HttpParams();

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });

    console.log("Sending Query Params:", params.toString()); // Debugging

    return this.http.get<{shipments: Shipment[], total: number, page:number, limit:number}>(this.apiUrl, { params });
  }

  getShipmentById(id: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
  }

  createShipment(shipment: Shipment): Observable<any> {
    return this.http.post<Shipment>(this.apiUrl, shipment);
  }

  updateShipment(id: string, shipment: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, shipment);
  }

  deleteShipment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

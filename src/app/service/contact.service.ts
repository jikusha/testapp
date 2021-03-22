import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IContact[]>{
    return this.http.get<IContact[]>("http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/contacts");
  }

  getById(id: any): Observable<IContact>{
    return this.http.get<IContact>(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/contacts/${id}`);
  }

  postData(val: any): Observable<any>{
    return this.http.post("http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/contacts", val);
  }

  deleteData(id: any): Observable<any>{
    return this.http.delete(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/contacts/${id}`);
  }

  updateData(contact: IContact,id:any): Observable<any>{
    return this.http.put(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/contacts/${id}`,contact);
  }

  downloadData(){
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.get(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/export_xls/${obj.id}`, { responseType: 'blob' });
    
  }

  downloadCsv() {
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.get(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/export_csv/${obj.id}`, { responseType: 'blob' });
  }

  downloadSelected(ids) {
    return this.http.get(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/export_xls_selected/${ids}`, { responseType: 'blob' });
  }

  
}

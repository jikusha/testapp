import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user';
import { IUser1 } from '../model/user1';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  currentUser: IUser1;

  getUsers(): Observable<any> {
    return this.http.get<any>("http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/users");
  }

  postData(data: any): Observable<any> {
    return this.http.post("http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/users", data);
  }

  getById(id: any): Observable<IUser1>{
    return this.http.get<IUser1>(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/users/${id}`);

  }

  deleteData(id: any): Observable<any>{
    return this.http.delete(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/users/${id}`);
  }

  getByEmail(email: any){
    return this.http.get<any>(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/send/${email}`, {responseType: 'text'});
  }

  

  


}

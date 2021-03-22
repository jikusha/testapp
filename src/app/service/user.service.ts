import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>("http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/persons");
  }

  getById(id: any): Observable<IUser>{
    return this.http.get<IUser>(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/person/${id}`);
  }

  postData(val: any): Observable<any>{
    return this.http.post("http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/persons", val);
  }

  deleteData(id: any): Observable<any>{
    return this.http.delete(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/person/${id}`);
  }

  updateData(user: IUser,id:any): Observable<any>{
    return this.http.put(`http://ec2-3-15-210-121.us-east-2.compute.amazonaws.com:8000/person/${id}`,user);
  }

}

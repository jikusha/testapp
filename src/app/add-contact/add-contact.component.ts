import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { IContact } from '../model/contact';
import { AuthService } from '../service/auth.service';
import { ContactService } from '../service/contact.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(private fb:FormBuilder, private contactService: ContactService, private auth: AuthService, private dialogRef: MatDialogRef<AddContactComponent>, private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: IContact, private notification: NotificationService) { }

  contactForm: FormGroup | undefined;

  ngOnInit(): void {
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.contactForm=this.fb.group({
      name:['',Validators.required],
      
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      user: [obj.id]
    })

    console.log(this.data);

  }

  reset(){
    this.contactForm?.reset();
    
  }

  save(){
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.contactService.postData(this.contactForm?.value).subscribe(resp => {
     
      this.reset();
      this.contactForm?.get('user')?.patchValue(obj.id);
      this.onClose();
      this.notification.success(":: Contact Added Successfully!!");
     

  });
    
  }

  onClose(){
    this.contactForm?.reset();
    
    this.dialogRef.close();
    
  }

  




}

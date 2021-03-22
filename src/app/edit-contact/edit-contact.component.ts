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
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  constructor(private fb:FormBuilder, private contactService: ContactService, private auth: AuthService, private dialogRef: MatDialogRef<AddContactComponent>, private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: IContact, private notification: NotificationService) { }

  contactForm: FormGroup | undefined;

  ngOnInit(): void {
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.contactForm=this.fb.group({
      name:[this.data.name,Validators.required],
      
      email:[this.data.email,[Validators.required,Validators.email]],
      phone:[this.data.phone,[Validators.required,Validators.pattern("[0-9]{10}")]],
      user: [obj.id]
    })

    console.log(this.data);

  }

  reset(){
    this.contactForm?.reset();
    
  }

  update(){
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.contactService.updateData(this.contactForm?.value, this.data.id).subscribe(resp => {
      
      this.reset();
      this.contactForm?.get('user')?.patchValue(obj.id);
      this.onClose();
      this.notification.success(":: Contact Modified Successfully!!");
     

  });
    
  }

  onClose(){
    this.contactForm?.reset();
    
    this.dialogRef.close();
    
  }


}

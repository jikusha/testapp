import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { IContact } from '../model/contact';
import { AuthService } from '../service/auth.service';
import { ContactService } from '../service/contact.service';
import { DialogService } from '../service/dialog.service';
import { NotificationService } from '../service/notification.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  
  
  listData: MatTableDataSource<any> ;
  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'actions'];
  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  
  title="Contact List";
  filterText="";
  filterText1="";
  filterText2="";
  isFilterOpen=false;
  selected = "xls";
  constructor(private contactService: ContactService, private auth: AuthService, private dialog: MatDialog, private dialogService: DialogService, private notification: NotificationService, private router: Router) { 
    
  }

  

  ngOnInit(): void {
    const obj = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.contactService.getUsers().subscribe(resp => {
      this.contacts=resp;  
      console.log(this.contacts);
      this.contacts = this.contacts.filter(data => data.user == obj.id);
      console.log(this.contacts);

      this.listData = new MatTableDataSource(this.contacts);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.selection = new SelectionModel<IContact>(true, []);

      console.log(this.listData.filteredData);
    });
    
  }



 
  contacts: IContact[]=[];
  selection;
  dataToDialog;

  deleteData(id: any){
    

    this.dialogService.openConfirmDialog("Do you realy want to delete this record?").afterClosed().subscribe(res => {
      if(res){
        this.contactService.deleteData(id).subscribe(resp => {
            this.ngOnInit();
            this.notification.success(":: Deleted Successfully!!");
            
            
          })
      }
    });

    


  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  onNameClear() {
    this.filterText="";
    this.applyColumnFilter();
  }

  onEmailClear() {
    this.filterText1="";
    this.applyColumnFilter();
  }
  onPhoneClear(){
    this.filterText2="";
    this.applyColumnFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  removeSelectedRows() {
    
    this.dialogService.openConfirmDialog("Do you realy want to delete all these "+ this.selection.selected.length+ " record?").afterClosed().subscribe(res => {
      if(res){
        this.selection.selected.forEach(item => {
     
          this.contactService.deleteData(item.id).subscribe(resp => {
            this.ngOnInit();
            this.notification.success("Selected data deleted successfully");
            this.unselectAll();
          })
          
        });
    
       
            
          }
      });
    }

    
  


  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="40%";
    dialogConfig.height="70%";
    
    const dialog = this.dialog.open(AddContactComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
    
  }

  onEdit(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="40%";
    dialogConfig.height="70%";
    dialogConfig.data=row;
    const dialog = this.dialog.open(EditContactComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  
  isSelected: boolean = false;
  hasValue: boolean = false;

  unselectAll(){
    this.selection = new SelectionModel<IContact>(true, []);
    this.isSelected=false;
    this.hasValue=this.selection.hasValue();
  }

  selectAll() {
    this.selection = new SelectionModel<IContact>(true, this.listData.data);
    this.isSelected=true;
    console.log(this.selection._selection);
    console.log(this.selection.hasValue());
    this.hasValue=this.selection.hasValue();
  }

  onSelect(){
    
    this.hasValue=this.selection.hasValue();
    
  }

  openFilter(){
    this.isFilterOpen=!this.isFilterOpen;
    this.onEmailClear();
    this.onPhoneClear();
    this.onNameClear();
    
    
    
    
  }

  applyColumnFilter(){
    let filteredContacts=this.contacts.filter((contact: IContact) => contact.name.toLocaleLowerCase().indexOf(this.filterText.toLocaleLowerCase())!==-1 && contact.email.toLocaleLowerCase().indexOf(this.filterText1.toLocaleLowerCase())!==-1 && contact.phone.toLocaleLowerCase().indexOf(this.filterText2.toLocaleLowerCase())!==-1 );
    this.listData = new MatTableDataSource(filteredContacts);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }

  download(){

    if(this.selected==="xls"){
      this.contactService.downloadData().subscribe(resp => {
        FileSaver.saveAs(resp, `contacts.xls`);
      });
    }

    else {
      this.contactService.downloadCsv().subscribe(resp => {
        FileSaver.saveAs(resp, `contacts.csv`);
      });
    }

    
    


   
  }

  

  downloadSelectedRows(){
    const mySet = this.selection._selection;
  const iter = this.selection._selection.values();
  let str = "";
  console.log(mySet.size);
  for( let i=0;i<mySet.size;i++){
      str = str.concat(iter.next().value.id, ',');
      
  }

  this.contactService.downloadSelected(str).subscribe(resp => {
    FileSaver.saveAs(resp, `contacts_selected.xls`);
  })
  
  }
  
  


  

}

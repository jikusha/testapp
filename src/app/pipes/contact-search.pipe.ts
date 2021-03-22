import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IContact } from '../model/contact';

@Pipe({
  name: 'contactSearch'
})
export class ContactSearchPipe implements PipeTransform {


  list: any;
  transform(listData:MatTableDataSource<any>,filterText: string,filterText1:string,filterText2: string): any {
    
    
   this.list=listData.filteredData;
    
    
    let filteredContacts=this.list.filter((contact: IContact) => contact.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase())!==-1 && contact.email.toLocaleLowerCase().indexOf(filterText1.toLocaleLowerCase())!==-1 && contact.phone.toLocaleLowerCase().indexOf(filterText2.toLocaleLowerCase())!==-1 );
    return new MatTableDataSource(filteredContacts);
    
  }

}

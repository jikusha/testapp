import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../model/user';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list:IUser[],filterText: string,filterText1:string,filterText2: string, filterText4: string, filterText5: string, filterText3: string): IUser[] {

    let filteredUsers=list.filter((user: IUser) => user.firstName.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase())!==-1 && user.lastName.toLocaleLowerCase().indexOf(filterText1.toLocaleLowerCase())!==-1 && user.email.toLocaleLowerCase().indexOf(filterText2.toLocaleLowerCase())!==-1 && user.city.toLocaleLowerCase().indexOf(filterText4.toLocaleLowerCase())!==-1 && user.state.toLocaleLowerCase().indexOf(filterText5.toLocaleLowerCase())!==-1 && user.phone.indexOf(filterText3)!==-1);
    return filteredUsers;
  }

}

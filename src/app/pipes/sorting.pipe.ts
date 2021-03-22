import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(list: any[]): any[] {

    let sorted=list.sort((a,b)=> {
      if(a>b){
        return 1;
      }
      if(a<b){
        return -1;
      }
      return 0;
    })
    return sorted;
  }

}

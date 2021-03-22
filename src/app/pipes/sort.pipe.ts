import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure:true
})
export class SortPipe implements PipeTransform {

  transform(list: any[],column: string,order: string): any[] {

    let sorted=list;

    if(order=="asc"){
      let sorted=list.sort((a,b)=>{
        if(a[column]>b[column]){
          return 1;
        }
        if(a[column]<b[column]){
          return -1;
        }
        return 0;
      })
    
    }

    if(order=="desc") {
      let sorted=list.sort((a,b)=>{
        if(a[column]>b[column]){
          return -1;
        }
        if(a[column]<b[column]){
          return 1;
        }
        return 0;
      })
    }
     

    
     
    
   
    return sorted;
  }

}

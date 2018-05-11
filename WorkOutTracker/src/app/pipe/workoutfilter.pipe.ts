import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workoutfilter'
})
export class WorkoutfilterPipe implements PipeTransform {

  transform(items: any[], searchText: any): any[] {
    console.log("Text "+searchText);
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.title.toLowerCase().includes(searchText);
    });
  }

}

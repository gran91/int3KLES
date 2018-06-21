import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listfilter',
  pure: false
})
export class ListFilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: any) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {any} item The any to compare to the filter.
   * @param {any} filter The filter to apply.
   * @return {boolean} True if any satisfies filters, false if not.
   */
  applyFilter(item: any, filter: any): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (item[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

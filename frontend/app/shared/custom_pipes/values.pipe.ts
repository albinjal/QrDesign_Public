import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const values = [];
    Object.keys(value).forEach(key => {
      values.push(value[key]);
    });
    console.log(values);
    return values;
  }
}

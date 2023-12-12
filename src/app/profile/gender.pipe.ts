import { Pipe, PipeTransform } from '@angular/core';

/**
 * Replaced by gender enum
 */
@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {

  transform(value: any): unknown {
    return value ? 'male' : 'female';
  }

}

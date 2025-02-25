import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authors',
  standalone: true,
})
export class AuthorsPipe implements PipeTransform {
  transform(value: string[]): string {
    if (value) {
      return value[0];
    }
    return '';
  }
}

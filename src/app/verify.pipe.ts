import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verify'
})
export class VerifyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

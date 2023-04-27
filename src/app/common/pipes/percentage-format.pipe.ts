import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Pipe({
  name: 'percentageFormat'
})
export class PercentageFormatPipe implements PipeTransform {
  transform(value: number): number {
    const decimalPipe = new DecimalPipe('en-US');
    return parseFloat(<string>decimalPipe.transform(value, '1.2-2'));
  }
}

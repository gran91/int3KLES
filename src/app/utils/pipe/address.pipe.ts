import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'address'
})

export class AddressPipe implements PipeTransform {
    transform(value: string, separatorIN: string, separatorOUT: string): any {
        if (value === undefined) {
            return '';
        } else {
            return value.split(separatorIN).join(separatorOUT);
        }
    }
}

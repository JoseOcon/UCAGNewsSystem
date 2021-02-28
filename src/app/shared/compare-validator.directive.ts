import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[compare]',
  providers:[{provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi:true}]
})
export class CompareValidatorDirective implements Validator {
  @Input('compare') controlNameToCompare: string;

  validate(c: AbstractControl): ValidationErrors | null {
    if(c.value === null  ||  c.value.length === 0){
      return null;
    }
    const controlNameToCompare = c.root.get(this.controlNameToCompare) 
    if(controlNameToCompare){
      const subscription:Subscription = controlNameToCompare.valueChanges.subscribe(()=>{
        c.updateValueAndValidity();
        subscription.unsubscribe();
      })
    }
    return controlNameToCompare && controlNameToCompare.value !== c.value ? {'compare':true}: null;
  }

}

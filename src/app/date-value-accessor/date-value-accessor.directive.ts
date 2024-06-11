import { Directive, ElementRef, HostListener, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true
}

@Directive({
    selector: 'input([type=date])[formControlName],input([type=date])[formControl],input([type=date])[ngModel]',
    providers: [DATE_VALUE_PROVIDER],
    standalone: true
})
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) { }

  @HostListener('input', ['$event.target.valueAsDate'])
  private onChange!: Function;

  @HostListener('blur', ['$event.target.valueAsDate'])
  private onTouch!: Function;

  registerOnChange(fn: Function): void {
    this.onChange = (valueAsDate: Date) => { fn(valueAsDate) }
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = (valueAsDate: Date) => { fn(valueAsDate) }
  }
 
  writeValue(newValue: any): void {
    if (newValue instanceof Date) {
      this.element.nativeElement.value = newValue.toISOString().split('T')[0];
    }
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }

}

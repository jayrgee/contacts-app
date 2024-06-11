import { Component, HostListener, Provider, forwardRef } from '@angular/core';
import { profileIconNames } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true
}

@Component({
    selector: 'con-profile-icon-selector',
    templateUrl: './profile-icon-selector.component.html',
    styleUrls: ['./profile-icon-selector.component.css'],
    providers: [PROFILE_ICON_VALUE_PROVIDER],
    standalone: true
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {
  profileIcons = profileIconNames;
  showAllIcons = true;
  selectedIcon!: string | null;

  private onChange!: Function;
  private onTouched!: Function

  writeValue(icon: string | null): void {
    this.selectedIcon = icon;
    if (icon && icon !=='')
      this.showAllIcons = false;
    else
      this.showAllIcons = true;
  }
  registerOnChange(fn: Function): void {
    this.onChange = (icon: string) => { fn(icon); };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = (icon: string) => { fn(icon); };
  }

  iconSelected(icon: string){
    console.log(icon);
    this.showAllIcons = false;
    this.selectedIcon = icon;
    this.onChange(icon);
  }
}
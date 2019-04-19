import { Directive, HostBinding, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input() initialClass: string;
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') clickDropdown(event: Event) {
    this.isOpen = !this.isOpen;
  }
}

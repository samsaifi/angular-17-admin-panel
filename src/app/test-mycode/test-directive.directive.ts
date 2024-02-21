import { Directive } from '@angular/core';

@Directive({
  selector: '[appTestDirective]',
  standalone: true
})
export class TestDirectiveDirective {

  constructor() { }

}

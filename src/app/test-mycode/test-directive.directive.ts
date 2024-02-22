import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appTestDirective]',
    standalone: true,
})
export class TestDirectiveDirective {
    constructor(private el: ElementRef) {
        this.el.nativeElement.style.backgroundColor = 'yellow';
    }
}

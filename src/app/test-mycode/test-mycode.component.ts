import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestDirectiveDirective } from './test-directive.directive';

@Component({
    selector: 'app-test-mycode',
    standalone: true,
    imports: [CommonModule, TestDirectiveDirective],
    templateUrl: './test-mycode.component.html',
    styleUrl: './test-mycode.component.css',
})
export class TestMycodeComponent {
    isSpecial: boolean = false;
    currentCustomer: { name: string } = { name: 'Sam saifi' };
    chagneStatus = () => (this.isSpecial = !this.isSpecial);
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FlashMessageService } from './services/flash-message.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './Components/layout/footer/footer.component';
import { SidebarComponent } from './Components/layout/sidebar/sidebar.component';
import { NavComponent } from './Components/layout/nav/nav.component';
import { TestMycodeComponent } from './Components/layout/test-mycode/test-mycode.component';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, TestMycodeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'crmapp';
    name: string = '';
    message: string | undefined;

    constructor(private flashMessageService: FlashMessageService) {}

    ngOnInit() {
        this.flashMessageService.getMessage().subscribe((message) => {
            this.message = message;

            // Automatically clear the message after a certain time (e.g., 3 seconds)
            setTimeout(() => {
                this.message = undefined;
            }, 3000);
        });
    }
}

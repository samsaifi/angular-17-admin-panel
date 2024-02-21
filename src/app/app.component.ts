import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from './nav/nav.component';
import { FlashMessageService } from './services/flash-message.service';
import { CommonModule } from '@angular/common';
import { TestMycodeComponent } from './test-mycode/test-mycode.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        FooterComponent,
        SidebarComponent,
        NavComponent,
        CommonModule,
        TestMycodeComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'crmapp';

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

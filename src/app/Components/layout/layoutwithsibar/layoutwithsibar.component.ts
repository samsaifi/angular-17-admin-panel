import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavComponent } from '../nav/nav.component';
import { FlashMessageService } from '../../../services/flash-message.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-layoutwithsibar',
    standalone: true,
    imports: [
        FooterComponent,
        SidebarComponent,
        NavComponent,
        RouterOutlet,
        CommonModule,
    ],
    templateUrl: './layoutwithsibar.component.html',
    styleUrl: './layoutwithsibar.component.css',
})
export class LayoutwithsibarComponent {
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

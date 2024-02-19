import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  private messageSubject = new Subject<string>();

  getMessage() {
    return this.messageSubject.asObservable();
  }

  showMessage(message: string) {
    this.messageSubject.next(message);
  }
}

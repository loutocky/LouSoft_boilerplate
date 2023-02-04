import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from 'src/client-shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ClientApp';

  users$: Observable<Array<User>> | undefined;

  constructor(private service: UserService, private cd: ChangeDetectorRef) {}

  loadUsers(): void {
    this.users$ = this.service.userControllerFindAll();
    this.cd.markForCheck();
  }
}

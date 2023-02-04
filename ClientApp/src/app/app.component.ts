import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User, UserService } from 'client-shared';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ClientApp';

  users$: Observable<Array<User>> | undefined;

  constructor(private service: UserService, private logger: NGXLogger, private translate: TranslateService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    let userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(cs|de|en|es|fr|hr|hu|nl|pl|pt|sk|sl|zh)/gi.test(userLang) ? userLang : 'en';

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
  }

  loadUsers(): void {
    this.logger.debug('Loading users');
    this.users$ = this.service.userControllerFindAll();
    this.cd.markForCheck();
  }
}

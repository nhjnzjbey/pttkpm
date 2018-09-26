import { Component, OnDestroy } from '@angular/core';
import { LoginConstant } from '../constant/login.constant';
import { LoginService } from '../service/user/login.service';
import { UserInformation } from '../user/login/user.model';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})


export class HeaderComponent implements OnDestroy {

    user: UserInformation;
    userSubcriber: Subscription;

    constructor(private loginService: LoginService) {
        this.userSubcriber = this.loginService.userChange.subscribe((user) => {
            this.user = user;
        });
    }

    ngOnDestroy(): void {
        this.userSubcriber.unsubscribe();
    }

    onClickRegister(): void {
        window.location.href = LoginConstant.API_ENDPOINT + 'register';
    }

    onClickLogin(): void {
        this.loginService.doLogin();
    }

}

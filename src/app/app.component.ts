import { Component, OnInit } from '@angular/core';
import CommonUtil from './util/common.util';
import DateTimeUtil from './util/datetime.util';
import { LoginConstant } from './constant/login.constant';
import { LoginService } from './service/user/login.service';
import { UserInformation } from './user/login/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.checkUserLogin();
  }

  constructor(private loginService: LoginService) {

  }

  checkUserLogin(): void {
    let hash = window.location.hash;
    if (hash.length > 1) {
      hash = hash.substring(1);
      window.location.hash = '';
      const infoToken = CommonUtil.decodeQueryParam(hash);
      const now = DateTimeUtil.now();
      if (hash.indexOf('access_token') === -1) {
        return;
      }
      if (infoToken['expires_in']) {
        infoToken['expires'] = now + parseInt(infoToken['expires_in'], 10);
      } else {
        infoToken['expires'] = now + LoginConstant.DEFAULT_LIFE_TIME;
      }
      if (infoToken['scopes']) {
        infoToken['scopes'] = infoToken['scopes'].split(' ');
      }

      CommonUtil.saveObject(LoginConstant.PROVIDER_ID, JSON.stringify(infoToken));
      this.loginService.loadInforUserFromAccessToken(infoToken['access_token']);
      return;
    } else {
      this.loginService.loadInforUserFromLocalStorage();
    }

  }
}

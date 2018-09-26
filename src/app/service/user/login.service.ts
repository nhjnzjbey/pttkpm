import { Injectable } from '@angular/core';
import CommonUtil from '../../util/common.util';
import { LoginConstant } from '../../constant/login.constant';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserInformation } from '../../user/login/user.model';
import DateTimeUtil from '../../util/datetime.util';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService implements CanActivate {

    user: UserInformation;

    userChange: Subject<UserInformation> = new Subject<UserInformation>();

    constructor(private router: Router,
        private http: HttpClient) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.user !== undefined) {
            return true;
        }
        this.loadInforUserFromLocalStorage();
        if (this.user !== undefined) {
            return true;
        }

        this.doLogin();

    }

    loadInforUserFromLocalStorage(): void {
        // if there is token saved in localstorage
        const tokenJson = CommonUtil.getObject(LoginConstant.PROVIDER_ID);
        if (tokenJson !== undefined && tokenJson != null) {

            if (tokenJson !== undefined && tokenJson.length > 0) {
                const token = JSON.parse(tokenJson);
                const now = DateTimeUtil.now();
                // if the token is not expired
                if (parseInt(token['expires'], 10) > now) {
                    this.loadInforUserFromAccessToken(token['access_token']);
                }

            }
        }
    }

    loadInforUserFromAccessToken(accessToken: string): void {
        const headerAutho = this.loadHeaderAuthentification();
        headerAutho['Content-Type'] = 'application/json';
        const httpOptions = {
            headers: new HttpHeaders(headerAutho)
        };
        const url = 'http://localhost:8500/user/token';
        this.http.get<UserInformation>(url, httpOptions)
            .subscribe(user => {
                this.user = user;
                this.userChange.next(this.user);
            });
    }

    loadHeaderAuthentification(): any {

        let tokenJson = CommonUtil.getObject(LoginConstant.PROVIDER_ID);
        tokenJson = JSON.parse(tokenJson);
        return {
            'Authorization': tokenJson['token_type'] + ' ' + tokenJson['access_token']
        };
    }


    doLogin(): void {
        const uuid = CommonUtil.generateUUID();
        const params = {
            'response_type': LoginConstant.TYPE,
            'state': uuid,
            'redirect_uri': LoginConstant.REDIRECT_ENDPOINT,
            'client_id': LoginConstant.CLIENT_ID,
            'scopes': LoginConstant.SCOPES,
            'providerID': LoginConstant.PROVIDER_ID
        };

        // not logged in so redirect to login page with the return url
        const authUrl = CommonUtil.encodeURL(LoginConstant.API_ENDPOINT_AUTH, params);
        window.location.href = authUrl;
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('Post Service: ' + message);
    }
}

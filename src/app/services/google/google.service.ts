import { Injectable, EventEmitter } from '@angular/core';
import { WindowService } from '../../utils/service/window.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class GoogleService {
    private oAuthCallbackUrl: string;
    private oAuthTokenUrl: string;
    private oAuthUserUrl: string;
    private oAuthUserNameField: string;
    private authenticated = false;
    private token: string;
    private expires: any = 0;
    private userInfo: any = {};
    private windowHandle: any = null;
    private intervalId: any = null;
    private expiresTimerId: any = null;
    private loopCount = 600;
    private intervalLength = 100;

    private locationWatcher = new EventEmitter();  // @TODO: switch to RxJS Subject instead of EventEmitter

    constructor(private windows: WindowService, private http: HttpClient) {
        //noinspection TypeScriptUnresolvedFunction
        /*http.get('config.json')
            .map(res => res.json())
            .subscribe((config: any) => {
                this.oAuthCallbackUrl = config.callbackUrl;
                this.oAuthTokenUrl = config.implicitGrantUrl;
                this.oAuthTokenUrl = this.oAuthTokenUrl
                    .replace('__callbackUrl__', config.callbackUrl)
                    .replace('__clientId__', config.clientId)
                    .replace('__scopes__', config.scopes);
                this.oAuthUserUrl = config.userInfoUrl;
                this.oAuthUserNameField = config.userInfoNameField;
            }, err => {
                console.error("Failed to fetch user info:", err);
            })*/

        const clientId = '781994805685-f8df4jcefdb56rfd8dv4rkktdu62gf4r.apps.googleusercontent.com';
        const scopes = 'https://www.googleapis.com/auth/userinfo.profile';
        this.oAuthCallbackUrl = 'http://localhost:4200/oauthcallback';
        this.oAuthTokenUrl = 'https://accounts.google.com/o/oauth2/auth?redirect_uri=__callbackUrl__&response_type=token&client_id=__clientId__&scope=__scopes__';
        this.oAuthTokenUrl = this.oAuthTokenUrl
            .replace('__callbackUrl__', this.oAuthCallbackUrl)
            .replace('__clientId__', clientId)
            .replace('__scopes__', scopes);
        this.oAuthUserUrl = 'https://www.googleapis.com/plus/v1/people/me';
        this.oAuthUserNameField = 'displayName';
    }

    public doLogin() {
        let loopCount = this.loopCount;
        console.log('Counter:', loopCount);
        console.log('oAuthTokenUrl:', this.oAuthTokenUrl);
        console.log('Window:', window);
        window.open(this.oAuthTokenUrl);
        this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'Google 3KLES');
        console.log(this.windowHandle);
        this.intervalId = setInterval(() => {
            if (loopCount-- < 0) {
                clearInterval(this.intervalId);
                this.emitAuthStatus(false);
                this.windowHandle.close();
            } else {
                let href: string;
                try {
                    href = this.windowHandle.location.href;
                } catch (e) {
                    console.log('Error:', e);
                }
                if (href != null) {
                    const re = /access_token=(.*)/;
                    const found = href.match(re);
                    if (found) {
                        console.log('Callback URL:', href);
                        clearInterval(this.intervalId);
                        const parsed = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                        const expiresSeconds = Number(parsed.expires_in) || 1800;

                        this.token = parsed.access_token;
                        if (this.token) {
                            this.authenticated = true;
                            this.startExpiresTimer(expiresSeconds);
                            this.expires = new Date();
                            this.expires = this.expires.setSeconds(this.expires.getSeconds() + expiresSeconds);

                            this.windowHandle.close();
                            this.emitAuthStatus(true);
                            this.fetchUserInfo();
                        } else {
                            this.authenticated = false; // we got the login callback just fine, but there was no token
                            this.emitAuthStatus(false); // so we are still going to fail the login
                        }

                    } else {
                        // http://localhost:3000/auth/callback#error=access_denied
                        if (href.indexOf(this.oAuthCallbackUrl) === 0) {
                            clearInterval(this.intervalId);
                            const parsed = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                            this.windowHandle.close();
                            this.emitAuthStatusError(false, parsed);
                        }
                    }
                }
            }
        }, this.intervalLength);
    }

    public doLogout() {
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true);
        console.log('Session has been cleared');
    }

    private emitAuthStatus(success: boolean) {
        this.emitAuthStatusError(success, null);
    }

    private emitAuthStatusError(success: boolean, error: any) {
        this.locationWatcher.emit(
            {
                success: success,
                authenticated: this.authenticated,
                token: this.token,
                expires: this.expires,
                error: error
            }
        );
    }

    public getSession() {
        return { authenticated: this.authenticated, token: this.token, expires: this.expires };
    }

    private fetchUserInfo() {
        if (this.token != null) {
            // const headers = new Headers();
            // headers.append('Authorization', `Bearer ${this.token}`);

            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${this.token}`
                })
            };

            //noinspection TypeScriptUnresolvedFunction
            this.http.get(this.oAuthUserUrl, httpOptions)
                .subscribe(info => {
                    console.log(JSON.stringify(info));
                    this.userInfo = info;
                }, err => {
                    console.error('Failed to fetch user info:', err);
                });
        }
    }

    public getUserInfo() {
        return this.userInfo;
    }

    public getUserName() {
        return this.userInfo ? this.userInfo[this.oAuthUserNameField] : null;
    }

    private startExpiresTimer(seconds: number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            console.log('Session has expired');
            this.doLogout();
        }, seconds * 1000); // seconds * 1000
        console.log('Token expiration timer set for', seconds, 'seconds');
    }

    public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
    }

    public isAuthenticated() {
        return this.authenticated;
    }

    private parse(str) { // lifted from https://github.com/sindresorhus/query-string
        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }

        return str.split('&').reduce(function (ret, param) {
            const parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            let key = parts.shift();
            let val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    };

}


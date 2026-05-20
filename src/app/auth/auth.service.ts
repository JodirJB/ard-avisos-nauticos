import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Base64UrlService } from '../services/base64url.service';
import { JwtAuthResult } from './JwtAuthResult.class';
// import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private API_URL = 'https://armada.mide.gob.do/api/auth/login';
    private TokenStorageKeyName = 'auth_token';
    private auth$ = new BehaviorSubject<JwtAuthResult | null>(null);

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService,
        private base64url: Base64UrlService
    ) { }

    private isTokenExpired(token: string, offsetSeconds?: number): boolean {
        if (!token || token === '') {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (date === null) {
            return false;
        }

        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }

    private getTokenExpirationDate(token: string): Date | null {
        let decoded: any;
        decoded = <any>jwtDecode(token);

        if (!decoded || !decoded.hasOwnProperty('exp')) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    isAuthenticated(): boolean {
        const storedToken = this.localStorage.getItem(this.TokenStorageKeyName);
        return storedToken ? !this.isTokenExpired(storedToken) : false;
    }

    isGrantedRole(grantedRoles: Array<any>): boolean {
        const roles = this.roles();
        if (!roles) {
            return false;
        }
        const roleList = JSON.parse(roles);
        // Always return true for the 'admin_master' role
        for (let x = 0; x < roleList.length; x++) {
            if (roleList[x].RoleName == '' || grantedRoles.includes(roleList[x].RoleName)) {
                return true;
            }
        }

        return false;
    }

    public getKeyFromToken(key: string): string | null {
        const storedToken = this.localStorage.getItem(this.TokenStorageKeyName);
        if (!storedToken) {
            return null;
        }
        const tokenPayload = jwtDecode<Record<string, any>>(storedToken);
        return tokenPayload.hasOwnProperty(key) ? tokenPayload[key] : null;
    }

    roles() {
        return this.getKeyFromToken('role');
    }

    removeAuthToken(): void {
        this.localStorage.removeItem(this.TokenStorageKeyName);
    }

    login(username: string, password: string): Observable<JwtAuthResult> {
        this.removeAuthToken();
        const clnUserName = username.replace(/-/g, '');
        const params = { username: clnUserName, password };

        const userInfo = this.base64url.encode(JSON.stringify(params), 'utf8');

        const url = `${this.API_URL}`;
        const headers = { Authentication: `${userInfo}` };

        return this.http.get<JwtAuthResult>(url, { headers }).pipe(map((authResult) => {
            this.localStorage.setItem(
                this.TokenStorageKeyName,
                authResult.accessToken
            );
            this.auth$.next(authResult);
            return authResult;
        })
        );
    }
}
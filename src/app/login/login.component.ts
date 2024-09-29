import { Component } from "@angular/core";
import { AuthService } from "../shared/auth/auth.service";
import { Exception } from "../shared/exception/exception";
import { Router } from "@angular/router";
import { catchError, of } from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    error?: string;

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    login() {
            this.auth.login(this.username, this.password)
            .pipe(
                catchError((error) => {
                    const _error = error as Exception;

                    this.error = _error.message;
                    if (_error.code === 401) {
                        this.username = '';
                        this.password = '';
                    }

                    return of();
                })
            )
            .subscribe((response) => {
                this.auth.setToken(response.token);
                this.router.navigate(['/game']);
            });
            
    }

    get disabled() {
        return this.username === '' || this.password === '';
    }
}
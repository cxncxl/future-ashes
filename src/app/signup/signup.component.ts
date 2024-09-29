import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, of } from "rxjs";
import { Exception } from "../shared/exception/exception";
import { SignupService } from "./signup.service";
import { AuthService } from "../shared/auth/auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    username: string = '';
    password: string = '';
    repeatPassword: string = '';

    error?: string;

    constructor(
        private service: SignupService,
        private auth: AuthService,
        private router: Router
    ) {}

    signup() {
        this.service.signup(this.username, this.password)
            .pipe(
                catchError((error) => {
                    const _error = error as Exception;

                    this.error = _error.message;
                    if (_error.code === 401) {
                        this.username = '';
                        this.password = '';
                        this.repeatPassword = '';
                    }

                    return of();
                })
            )
            .subscribe(() => {
                this.auth.login(this.username, this.password).subscribe((response) => {
                    this.auth.setToken(response.token);
                    this.router.navigate(['/game']);
                });
            });
    }

    get disabled() {
        return (this.username === '' || this.password === '') || this.password !== this.repeatPassword;
    }
}
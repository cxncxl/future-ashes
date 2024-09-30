import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './app.service';
import { AuthService } from './shared/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private service: AppService
  ) {}

  ngOnInit(): void {
    if (!this.auth.logined) this.router.navigate(['/login']);

    this.service.tokenValid().pipe(
      catchError((error) => {
        if (error.code === 403) {
          this.auth.logout();
          this.router.navigate(['/login']);

        }

        return of();
      })
    )
    .subscribe();
  }
}

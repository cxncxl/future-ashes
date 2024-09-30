import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth/auth.service";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (!this.auth.logined) {
            this.router.navigate(['/login']);
            return;
        }

        const gameScript = document.createElement('script');
        gameScript.src = 'gamebuild/bundle.js';

        document.body.appendChild(gameScript);
    }
}
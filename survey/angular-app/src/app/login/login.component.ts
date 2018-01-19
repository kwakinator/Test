import { Component, OnInit } from '@angular/core';
import { User } from './../user';
import { UserService } from './../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = new User();
    error: string = null;

    constructor(private _userService: UserService) { }

    ngOnInit() {
    }


    login_attempt(event: Event){
        event.preventDefault();
        console.log('login attempt')
        this._userService.login_attempt(this.user)
            .subscribe(
                user => this._userService.login(user),
                errorResponse => this.error = errorResponse.json()
            );
    }

    logout(event: Event){
        event.preventDefault();
        console.log('log out')
        this._userService.logout();
    }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { BehaviorSubject, Observer } from 'Rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

    user: User = new User();
    password: string;
    confirm_password: string;

    users: User[] = [];
    emailError: any = {};


    constructor(private _userService: UserService) { }

    ngOnInit() {
        //this._userService.getAllUsers();
    }

    register(event:Event){
        event.preventDefault();
        console.log('register', this.user);
        this.user.password = this.password;
        this._userService.register(this.user).subscribe(
            (user: any) => {
                console.log('in subscribe user')
                this._userService.login(user);
            },
            errorResponse => {
                console.log('in subscribe email')
                this.emailError = errorResponse.json();
            }
        );

    }

}

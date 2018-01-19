import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

    userObserver = new BehaviorSubject([]);

    loginObserver = new BehaviorSubject({});

    logged_in_user: User = new User();
    logged_in: boolean = false;

    constructor(private _http: Http, private _router: Router) { }


    getAllUsers(){
        this._http.get('http://localhost:8000/users').toPromise()
            .then((users) => this.userObserver.next(users.json()))
            .catch((error) => console.log(error))
    }

    login_attempt(user: User): Observable<User>{
        console.log('sending login request');
        return this._http.post('http://localhost:8000/login', user)
            .map((response) => {
                console.log('logged in!')
                return response.json();
            })
            .catch((error) => {
                console.log('log in error', error);
                return Observable.throw(error);
            })
    }

    getUserStored(): Observable<User>{
        console.log('getUserStored');
        if(localStorage.id){
            console.log('id found', localStorage.id);
            return this._http.post('http://localhost:8000/user', { _id: localStorage.id })
                .map((response) => {
                    console.log('set user', this.logged_in_user);
                    this.logged_in_user = response.json();
                    return response.json();
                })
                .catch((error) => {
                    console.log('stored user error', error);
                    return Observable.throw(error);
                })
        } else {
            return null;
        }

    }

    logout(){
        console.log('in log out func');
        this.logged_in_user = new User();
        localStorage.setItem('id', undefined);
    }

    login(user: User){
        console.log('in login func');
        this.logged_in_user = user;
        this._router.navigateByUrl('/polls');
        localStorage.setItem('id', this.logged_in_user._id);
    }

}

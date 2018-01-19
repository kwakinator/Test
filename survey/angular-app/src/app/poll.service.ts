import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Poll } from './poll';


@Injectable()
export class PollService {
    logged_in_poll: Poll = new Poll();

    pollsObserver = new BehaviorSubject([]);

    constructor(private _http: Http, private _router: Router) { }

    create_poll(poll: Poll): Observable<Poll>{
      return this._http.post('http://localhost:8000/polls', poll)
          .map((response)=>{
              console.log(response);
              return response.json();
          })
          .catch((error)=> Observable.throw(error))
    }

    getAllPolls(): Observable<Poll[]>{
      return this._http.get('http://localhost:8000/dashboard')
          .map((response)=>{
              console.log(response);
              return response.json();
          })
           .catch((error)=> Observable.throw(error))
    }

    getPollFromDB(poll: Poll) : Observable<Poll>{
      return this._http.get(`http://localhost:8000/polls/${poll._id}`)
        .map((response)=>{
          console.log(response);
          return response.json();
        })
        .catch((error)=> Observable.throw(error))
}

    deletePoll(poll: Poll): Observable<Poll>{
        return this._http.delete(`http://localhost:8000/polls/${poll._id}`)
            .map((response)=>{
                console.log(response);
                return response.json();
            })
            .catch((error)=> Observable.throw(error))
    }

    getPollStored(): Observable<Poll>{
        console.log('getPollStored');
        if(localStorage.id){
            console.log('id found', localStorage.id);
            return this._http.post('http://localhost:8000/polls', { _id: localStorage.id })
                .map((response) => {
                    console.log('set poll', this.logged_in_poll);
                    this.logged_in_poll = response.json();
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

    logpoll(poll: Poll){
        console.log('in poll options');
        this.logged_in_poll = poll;
        this._router.navigateByUrl('/polls');
        localStorage.setItem('id', this.logged_in_poll._id);
    }


}

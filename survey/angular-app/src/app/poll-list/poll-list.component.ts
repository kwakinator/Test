import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Poll } from './../poll';
import { PollService } from './../poll.service';
import { UserService } from './../user.service';
import { User } from './../user';

import { Http } from '@angular/http';

import { BehaviorSubject } from 'Rxjs';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {
  user_polls: Poll[] = [];
  showForm: boolean[] = [];
  poll = [];


  constructor(private _userService: UserService, private _pollService: PollService) { }

  ngOnInit() {
      this._userService.getUserStored()
          .subscribe(
              user => {
                  this.user_polls = user.polls
                  for(let i = 0; i < this.user_polls.length; i++){
                        this.showForm[i] = false;
                    }
              }
          );
  }

  createPoll(poll: Poll) {
    console.log(poll);
    this.poll.push(poll);
  }

  deletePoll(poll_to_delete: Poll){
      console.log('delete poll', poll_to_delete);
      this._pollService.deletePoll(poll_to_delete)
          .subscribe(
              poll => {
                  console.log('poll deleted')
              }
          );
      this.user_polls.splice(this.user_polls.indexOf(poll_to_delete), 1);
  }

  addPoll(poll: Poll){
      console.log('adding poll', poll);
      this.user_polls.push(poll);
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Poll } from './../poll';
import { PollService } from './../poll.service';
import { UserService } from './../user.service';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.css']
})
export class PollCreateComponent implements OnInit {
  // @Output() addOption = new EventEmitter();
  @Output() addPoll = new EventEmitter();

  poll: Poll = new Poll();
  // option: Option = new Option();

  constructor(private _pollService: PollService, private _userService: UserService) { }

  ngOnInit() {

  }

  newPoll(event: Event){
      event.preventDefault();
      this.poll.user = this._userService.logged_in_user;
      this._pollService.create_poll(this.poll)
          .subscribe(
              poll => {
                  console.log('bout to emit', poll);
                  this.addPoll.emit(poll);
              },
              error => console.log(error)
          );
      this.poll = new Poll();
      console.log('new poll');
  }

  newOption(event: Event){

  }

}

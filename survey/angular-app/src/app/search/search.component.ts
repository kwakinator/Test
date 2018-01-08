import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { PollService } from './../poll.service';
import { User } from './../user';
import { Poll } from './../poll';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    all_polls: Poll[] = [];
    searchTerm: string;

    constructor(private _pollService: PollService) { }

    ngOnInit() {
        this.getPolls();
    }

    search(event: Event){
        event.preventDefault();
        console.log('Search!', this.searchTerm);
        this.all_polls = this.all_polls.filter(poll => poll.question.toLowerCase().includes(this.searchTerm.toLowerCase()) )
        if(this.all_polls.length === 0){
            this.all_polls = null;
        }
    }

    reset(){
        this.searchTerm = '';
        this.getPolls();
    }
    getPolls(){
        this._pollService.getAllPolls()
            .subscribe(
                polls => this.all_polls = polls
            );
    }


}

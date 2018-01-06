import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { BikeService } from './../bike.service';
import { User } from './../user';
import { Bike } from './../bike';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    all_bikes: Bike[] = [];
    searchTerm: string;

    constructor(private _bikeService: BikeService) { }

    ngOnInit() {
        this.getBikes();
    }

    search(event: Event){
        event.preventDefault();
        console.log('Search!', this.searchTerm);
        this.all_bikes = this.all_bikes.filter(bike => bike.title.toLowerCase().includes(this.searchTerm.toLowerCase()) )
        if(this.all_bikes.length === 0){
            this.all_bikes = null;
        }
    }

    reset(){
        this.searchTerm = '';
        this.getBikes();
    }
    getBikes(){
        this._bikeService.getAllBikes()
            .subscribe(
                bikes => this.all_bikes = bikes
            );
    }


}

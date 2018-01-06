import { Component, OnInit } from '@angular/core';
import { User } from './../user';
import { UserService } from './../user.service';
import { BikeService } from './../bike.service';
import { Bike } from './../bike';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

    user_bikes: Bike[] = [];
    showForm: boolean[] = [];

    constructor(private _userService: UserService, private _bikeService: BikeService) { }

    ngOnInit() {
        this._userService.getUserStored()
            .subscribe(
                user => {
                    this.user_bikes = user.bikes
                    for(let i = 0; i < this.user_bikes.length; i++){
                        this.showForm[i] = false;
                    }
                }
            );
    }

    deleteBike(bike_to_delete: Bike){
        console.log('delete bike', bike_to_delete);
        this._bikeService.deleteBike(bike_to_delete)
            .subscribe(
                bike => {
                    console.log('bike deleted')

                }
            );
        this.user_bikes.splice(this.user_bikes.indexOf(bike_to_delete), 1);
    }

    addBike(bike: Bike){
        console.log('adding bike', bike);
        this.user_bikes.push(bike);
    }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bike } from './../bike';
import { BikeService } from './../bike.service';
import { UserService } from './../user.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    @Output() addBike = new EventEmitter();

    bike: Bike = new Bike();

    constructor(private _bikeService: BikeService, private _userService: UserService) { }

    ngOnInit() {

    }

    newBike(event: Event){
        event.preventDefault();
        this.bike.user = this._userService.logged_in_user;
        this._bikeService.create_bike(this.bike)
            .subscribe(
                bike => {
                    console.log('bout to emit', bike);
                    this.addBike.emit(bike);
                },
                error => console.log(error)
            );
        this.bike = new Bike();
        console.log('new bike');
    }

}

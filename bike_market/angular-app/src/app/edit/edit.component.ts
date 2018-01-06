import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Bike } from './../bike';
import { BikeService } from './../bike.service';
import { UserService } from './../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    @Input() bike_to_edit: Bike;
    @Input() index: number;
    @Output() hide = new EventEmitter();

    constructor(private _bikeService: BikeService) { }

    ngOnInit() {
    }

    edit(event: Event){
        event.preventDefault();
        console.log('editing bike');
        this._bikeService.editBike(this.bike_to_edit)
            .subscribe(
                bike => console.log(bike),
                error => console.log(error)
            );
        this.hide.emit();
    }

}

import { User } from './user';

export class Bike {
    _id: string
    title: string;
    price: number;
    image_url: string;
    description: string;
    location: string;
    user: User;
    constructor(){  }
}

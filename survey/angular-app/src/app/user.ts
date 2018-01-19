import { Poll } from './poll';

export class User {
    _id: string;
    name: string;
    polls: Poll[];
    constructor(){   }
}

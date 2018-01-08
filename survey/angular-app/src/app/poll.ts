import { User } from './user';

export class Poll {
    _id: string
    question: string;
    option1: '';
    option2: '';
    option3: '';
    option4: '';
    user: User;
    constructor(){  }
}

import { Caller } from './caller';

export class Room {
    public id: number;
    public callers: Caller[] = [];

    constructor(uid: number) {
        this.id = uid;
    }
    public addCaller(caller: Caller): void {
        this.callers.push(caller);
    }
}

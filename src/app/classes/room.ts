import { Caller } from './caller';

export class Room {
    public callers: Array<Caller> = [];

    public addCaller(caller: Caller): void {
        this.callers.push(caller);
    }
}

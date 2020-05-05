import { Room } from './room';
import { Caller } from './caller';

export class Console {
    public connected = false;
    public id: number;
    public rooms: Array<Room> = [new Room(0), new Room(1)];
    constructor(idx: number) {
        this.id = idx;
    }

    public addCaller(caller: Caller): void {
        const room: Room | undefined = this.rooms.find((roomElement: Room) => roomElement.callers.length < 8);
        if (room) {
            room.addCaller(caller);
        }
    }
}

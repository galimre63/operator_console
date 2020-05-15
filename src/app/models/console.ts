import { Room } from './room';
import { Caller } from './caller';

export class Console {

    public connected = false;
    public id: number;
    public rooms: Array<Room> = [new Room(0), new Room(1)];

    constructor(idx: number) {
        this.id = idx;
    }

    public addCaller(caller: Caller): boolean {
        const found: Room | undefined = this.rooms.find((roomE: Room) => {
            const found0: Caller | undefined = roomE.callers.find(cal => cal.channel === caller.channel);
            return found0 !== undefined;
        });
        if (!found) {
            const room: Room | undefined = this.rooms.find((roomElement: Room) => roomElement.callers.length < 8);
            if (room) {
                room.addCaller(caller);
            }
        }
        return (!found);
    }
}

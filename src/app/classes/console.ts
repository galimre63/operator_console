import { Room } from './room';

export class Console {
    public connected: boolean = false;
    public id: number;
    public rooms: Array<Room> = [new Room(), new Room()];
    constructor(id_: number) {
        this.id = id_;
    }
}

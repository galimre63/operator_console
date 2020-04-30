export interface CallerInterface {
    channel: number;
    mute: boolean;
    name: string;
    aSzam: string;
    hivottSzam: string;
    hivasAzon: number;
    kivalasztva: boolean;
}

export class Caller {
    public channel: number;
    public mute: boolean;
    public name: string;
    public aSzam: string;
    public hivottSzam: string;
    public hivasAzon: number;
    public startTime: Date;
    public dcchatLogKodszo: string;
    public kivalasztva: boolean;
    public startMute: number;
    constructor(obj: CallerInterface) {
        Object.assign(this, obj);
        console.log('caller:', this);
    }
}

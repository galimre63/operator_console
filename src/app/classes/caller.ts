export class Caller {
    public channel:number;
    public mute:boolean;
    public name:string;
    public a_szam:string;
    public hivott_szam:string;
    public hivasAzon:number;
    public startTime:Date;
    public dcchat_log_kodszo:string;
    public kivalasztva:boolean;
    public startMute:number;
    constructor(obj:object){
        Object.assign(this,obj);
        console.log('caller:',this);
    }
}

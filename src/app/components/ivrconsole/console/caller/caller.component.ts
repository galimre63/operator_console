import { Component, OnInit, Input } from '@angular/core';
import { Caller } from 'src/app/classes/caller';

@Component({
  selector: 'app-caller',
  templateUrl: './caller.component.html',
  styleUrls: ['./caller.component.css']
})
export class CallerComponent implements OnInit {

  @Input() caller: Caller;
  public backgroundColor:string = '';
  public color:string='';

  constructor() { }

  ngOnInit() {
  }

  public getBackgroundColor():string{
    this.setBackgroundColor();
    return this.backgroundColor;
  }

  public getColor():string{
    this.setBackgroundColor();
    return this.color;
  }

  private setBackgroundColor():void{
    if(this.caller.name.indexOf("operátor_")==0){
      if(this.caller.kivalasztva){
        this.backgroundColor = "rgb(130,200,130)";
        this.color = "yellow";
      }else{
          this.backgroundColor = "rgb(150,220,150)";
          this.color = "black";
      }
    }else{
      if(!this.caller.mute){
        if(this.caller.kivalasztva){
              this.backgroundColor = "rgb(120,100,100)";
              this.color = "yellow";
        }else{
            this.backgroundColor = "rgb(170,150,150)";
            this.color = "black";
        }
      }else{
         if(this.caller.kivalasztva){
              this.backgroundColor = "rgb(220,30,30)";
              this.color = "yellow";
         }else{
              this.backgroundColor = "rgb(250,60,60)";
              this.color = "black";
         }
      }
    }
  }
}

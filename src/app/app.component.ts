import { Component, ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver} from '@angular/core';
import {
  DieComponent
} from './die/die.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data= {
    title: 'Roll Your Dice',
    numberOfDice: 0,
    diceSize: 4,
    result: 0
  };

  /* Code to render the die component dynamically */
  @ViewChild("dieContainer", { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  
  constructor(private resolver: ComponentFactoryResolver) {}

  createComponent(rollValue) {
    const factory = this.resolver.resolveComponentFactory(DieComponent);
    const componentRef = this.entry.createComponent(factory);
    componentRef.instance.rollValue = rollValue;
  }

  /* Rest of actions */
  onKeyUp(newNumberOfDice:number) {
    this.data.numberOfDice = newNumberOfDice;
  }

  onSelectorClick(newDiceSize:number) {
    this.data.diceSize = newDiceSize;
    // reset all other values 
    this.data.numberOfDice = 0;
    this.data.result = 0;
    this.entry.clear();
  }

  // calculates random value from 1-Value
  randomValueFromOne(diceSize:number) {
    return Math.floor((Math.random() * diceSize) + 1);
  }

  calculateValueFromOne(numberOfDice:number, diceSize:number) {
    var total = 0;

    for(var i = 0; i < numberOfDice; i++){
      var newValue = this.randomValueFromOne(diceSize);
      this.createComponent(newValue);
      total += newValue;
    }

    this.data.result = total;
  }

  // calculates random value from 0-Value
  randomValueFromZero(diceSize:number){
    return Math.floor(Math.random() * Math.floor(diceSize));
  }

  calculateValueFromZero(numberOfDice:number, diceSize:number, byTen:boolean) {
    var total = 0;

    for(var i = 0; i < numberOfDice; i++){
      var newValue = this.randomValueFromZero(diceSize);
      if(byTen){
        newValue = newValue * 10;
      }
      this.createComponent(newValue);
      total += newValue;
    }

    this.data.result = total;
  }
  

  onClickCalculateValue() {
    this.entry.clear();
    // to get around the casting of "10 (00-90)" or "10 (0-9)" as a number
    if(Number.isNaN(this.data.diceSize*1)){
      if(String(this.data.diceSize) == '10 (0-9)'){
        this.calculateValueFromZero(this.data.numberOfDice, 10, false);
      }
      else {
        this.calculateValueFromZero(this.data.numberOfDice, 10, true);
      }
    } 
    else {
      this.calculateValueFromOne(this.data.numberOfDice, this.data.diceSize);
    }
  }
}

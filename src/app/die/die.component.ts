import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent implements OnInit {

  @Input()
  rollValue: number; 

  constructor() { }

  ngOnInit() {
  }

}

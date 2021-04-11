import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http'
// import * as test from '../../../assets/instructions.json'

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  instructions : any = []
  constructor(private httpClient:HttpClient) {
    this.httpClient.get('assets/instructions.json').subscribe(data=>{
      this.instructions = data
    })
  }

  ngOnInit(): void {

  }

}

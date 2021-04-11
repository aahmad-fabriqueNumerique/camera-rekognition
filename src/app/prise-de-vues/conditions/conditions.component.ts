import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.css']
})
export class ConditionsComponent implements OnInit {
  conditions:any = []
  constructor(private httpClient:HttpClient) {
    this.httpClient.get('assets/conditions.json').subscribe(data=>{
      console.log(data)
      this.conditions = data
    })
  }

  ngOnInit(): void {
  }

}

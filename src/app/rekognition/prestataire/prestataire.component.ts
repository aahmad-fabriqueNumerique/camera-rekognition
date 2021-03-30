import { Component, OnInit } from '@angular/core';
import { RekognitionService } from 'src/app/services/rekognition.service';



@Component({
  selector: 'app-prestataire',
  templateUrl: './prestataire.component.html',
  styleUrls: ['./prestataire.component.css']
})
export class PrestataireComponent implements OnInit {

  prestataires = []

  prestataireID: string

  selectedDate = new Date().toISOString().slice(0, 10)

  constructor(private rekService:RekognitionService) { }


  getPrestataires(){
    this.prestataireID = this.rekService.id
    console.log(this.prestataireID)
      this.rekService.getPrestataires().then(data => {
      this.prestataires = data.Items.filter(user => user.userID === this.prestataireID && user.date.slice(0, 10) === this.selectedDate)

      this.prestataires.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      })
      console.log("prestataires", this.prestataires);
    })
  }

  



  ngOnInit(): void {
    this.getPrestataires()
  }

  newDate() {
    this.getPrestataires()
  }

}
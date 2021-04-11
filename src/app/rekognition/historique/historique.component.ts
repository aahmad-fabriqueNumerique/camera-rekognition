import { Component, OnInit } from '@angular/core';
import { RekognitionService } from 'src/app/services/rekognition.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  prestataires = []

  prestataireID: string

  selectedDate = new Date().toISOString().slice(0, 10)

  processorStatus:string


  // constructor
  constructor(private rekService: RekognitionService, private router: Router) {
    this.selectedDate  =this.rekService.selectedDate
    this.rekService.describeStream().then(res=>this.processorStatus=res.Status)

  }


  getPrestataires() {
    this.rekService.getPrestataires()
      .then(data => this.prestataires = data.Items // retrieve data via promise
        .filter(prestataire => prestataire.id.slice(0, 10) === this.selectedDate) // filtrer selon date sous format yyyy/mm/dd
        .sort((a, b) => { // trier selon l'email
          if (a.email < b.email) {
            return -1;
          }
          if (a.email > b.email) {
            return 1;
          }
          return 0;
        }))

    console.log("prestataires", this.prestataires);
  }

  navigateToPrestataire(id:string) {
    this.rekService.id = id
    this.router.navigate(['prestataire'])
  }



  updateDate() {
    console.log(this.selectedDate)
    this.rekService.selectedDate = this.selectedDate
    this.getPrestataires()
  }

  ngOnInit() {
    this.getPrestataires()
  }

  startStream(){
    this.rekService.startStream()
    this.rekService.describeStream().then(res=>this.processorStatus=res.Status)
  }

  stopStream(){
    this.rekService.stopStream()
    this.rekService.describeStream().then(res=>this.processorStatus=res.Status)
  }

  addData(){
    // for (let i=0 ; i<5 ; i++){
    //   this.rekService.addItem()
    // }
  }

  // describeStream(){
  //   this.rekService.describeStream()
  // }

}



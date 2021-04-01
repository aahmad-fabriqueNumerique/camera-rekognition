import { Component, OnInit } from '@angular/core';
import { RekognitionService } from 'src/app/services/rekognition.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mon-historique',
  templateUrl: './mon-historique.component.html',
  styleUrls: ['./mon-historique.component.css']
})
export class MonHistoriqueComponent implements OnInit {

  prestataires = []

  prestataireID: string

  selectedDate = new Date().toISOString().slice(0, 10)


  // constructor
  constructor(private rekService: RekognitionService, private router: Router) {


  }


  getPrestataires() {
    this.rekService.getPrestataires()
      .then(data => this.prestataires = data.Items // retrieve data via promise
        .filter(prestataire => prestataire.id.slice(0, 10) === this.selectedDate && prestataire.ExternalImageId === this.prestataireID) // filtrer selon date sous format yyyy/mm/dd
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

  navigateToPrestataire(id) {
    this.rekService.id = id
    this.router.navigate(['prestataire'])
  }



  updateDate() {
    console.log(this.selectedDate)
    this.getPrestataires()
  }

  ngOnInit() {
    this.getPrestataires()
  }

  addData(){
    // for (let i=0 ; i<5 ; i++){
    //   this.rekService.addItem()
    // }
  }

}
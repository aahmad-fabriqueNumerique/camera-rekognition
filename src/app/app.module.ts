import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './prise-de-vues/camera/camera.component';

import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import { NavbarComponent } from './navbar/navbar.component';
import { InstructionsComponent } from './prise-de-vues/instructions/instructions.component';
import { ConditionsComponent } from './prise-de-vues/conditions/conditions.component';
import { HttpClientModule } from '@angular/common/http';
import { HistoriqueComponent } from './rekognition/historique/historique.component';
import { PrestataireComponent } from './rekognition/prestataire/prestataire.component';
import { PriseDeVuesModule } from './prise-de-vues/prise-de-vues.module';
import { RekognitionModule } from './rekognition/rekognition.module';
import { FileUploadService } from './services/file-upload.service';
import { RekognitionService } from './services/rekognition.service';
import { MonHistoriqueComponent } from './prise-de-vues/mon-historique/mon-historique.component';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    NavbarComponent,
    InstructionsComponent,
    ConditionsComponent,
    HistoriqueComponent,
    PrestataireComponent,
    MonHistoriqueComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WebcamModule,
    HttpClientModule,
    PriseDeVuesModule,
    RekognitionModule
  ],
  providers: [FileUploadService,RekognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

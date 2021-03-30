import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PriseDeVuesRootingModule } from './prise-de-vues-rooting.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WebcamModule, HttpClientModule, FormsModule,
    PriseDeVuesRootingModule
  ]
})
export class PriseDeVuesModule { }



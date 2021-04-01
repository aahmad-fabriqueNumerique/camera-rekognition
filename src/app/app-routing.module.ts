import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriseDeVuesModule } from './prise-de-vues/prise-de-vues.module';
import { RekognitionModule } from './rekognition/rekognition.module';

const routes: Routes = [
  { path: 'prisedevues', loadChildren: ()=> import('./prise-de-vues/prise-de-vues.module').then(module => module.PriseDeVuesModule) },
  // { path: 'rekognition', loadChildren: ()=> import('./rekognition/rekognition.module').then(module => module.RekognitionModule) },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),PriseDeVuesModule,RekognitionModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

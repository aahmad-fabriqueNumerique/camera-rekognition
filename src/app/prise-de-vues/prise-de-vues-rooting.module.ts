import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CameraComponent } from "./camera/camera.component";
import { ConditionsComponent } from "./conditions/conditions.component";
import { InstructionsComponent } from "./instructions/instructions.component";
import { MonHistoriqueComponent } from './mon-historique/mon-historique.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "conditions", component: ConditionsComponent },
      { path: "instructions", component: InstructionsComponent },
      { path: "camera", component: CameraComponent },
      { path: "mon-historique", component: MonHistoriqueComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriseDeVuesRootingModule {}


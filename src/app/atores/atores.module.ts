import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtoresPageRoutingModule } from './atores-routing.module';

import { AtoresPage } from './atores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtoresPageRoutingModule
  ],
  declarations: [AtoresPage]
})
export class AtoresPageModule {}

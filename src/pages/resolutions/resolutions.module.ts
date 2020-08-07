import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResolutionsPage } from './resolutions';

@NgModule({
  declarations: [
    ResolutionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResolutionsPage),
  ],
})
export class ResolutionsPageModule {}

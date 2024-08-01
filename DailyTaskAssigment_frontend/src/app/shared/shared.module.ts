import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { StoreComponent } from './store/store.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule
  ],
  exports: [StoreComponent]
})
export class SharedModule { }

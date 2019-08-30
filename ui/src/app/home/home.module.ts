import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './components/details/details.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    DetailsComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class HomeModule { }

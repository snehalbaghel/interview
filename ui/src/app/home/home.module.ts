import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './components/details/details.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    DetailsComponent,
    TabsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }

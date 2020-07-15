import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { LeftControlComponent } from './left-control/left-control.component';
import { ListComponent } from './left-control/list/list.component';


@NgModule({
  declarations: [MainComponent, LeftControlComponent, ListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }

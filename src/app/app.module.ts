import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

// modules
import {SetupModule} from './pages/setup/setup.module';
import {MainModule } from './pages/main/main.module';
import {SummaryModule } from './pages/summary/summary.module';


// services
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { ListService } from './services/list/list.service';
import { TodoService } from './services/todo/todo.service';
import { InitGuardService } from './services/init-guard/init-guard.service';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SetupModule,
    MainModule,
    SummaryModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-Hans' },
    { provide: NZ_I18N, useValue: zh_CN },
    LocalStorageService,
    ListService,
    TodoService,
    InitGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

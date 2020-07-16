import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { USERNAME } from '../../../services/local-storage/local-storage.namespace';
import { ListComponent } from './list/list.component';


@Component({
  selector: 'app-left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.less']
})
export class LeftControlComponent implements OnInit {
  @Input() isCollapsed: boolean;
  @ViewChild(ListComponent) listComponent: ListComponent;

  username: string;
  router: Router;

  constructor(
    private store: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.username = this.store.get(USERNAME);
  }

  openAddListModal(): void {
    // 在Angular中调用子组件
    this.listComponent.openAddListModal();
  }

  goSetting(): void {
    this.router.navigateByUrl('/setting');
  }

  goSummary(): void {
    this.router.navigateByUrl('/summary');
  }

}

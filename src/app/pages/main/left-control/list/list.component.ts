import { Component, OnInit, Input, TemplateRef,
OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzModalService
} from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { List } from '../../../../../domain/entities';
import { ListService } from '../../../../services/list/list.service';
import { TodoService } from '../../../../services/todo/todo.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  @Input() isCollapsed: boolean;
  @ViewChild('listRenameInput') private listRenameInput: ElementRef;
  @ViewChild('listInput') private listInput: ElementRef;

  lists: List[];
  currentListUuid: string;
  contextListUuid: string;
  addListModalvisible = false;
  renameListModalvisible = false;

  private dropdown: NzDropdownMenuComponent;
  private destroy$ = new Subject();

  constructor(
    private dropdownService: NzContextMenuService,
    private listService: ListService,
    private todoService: TodoService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.listService.lists$.pipe(takeUntil(this.destroy$)).subscribe(lists =>{this.lists = lists;});
    this.listService.currentUuid$.pipe(takeUntil(this.destroy$)).subscribe(uuid => {this.currentListUuid = uuid;});
    this.listService.getAll();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  closeAddListModal(): void {
    this.addListModalvisible = false;
  }

  closeRenameListModal(): void {
    this.renameListModalvisible = false;
  }

  openAddListModal(): void {
    this.addListModalvisible = true;
    setTimeout(() => {this.listInput.nativeElement.focus();});
  }

  openRenameListModal(): void{
    this.renameListModalvisible = true;
    setTimeout(() => {
      const title = this.lists.find(l => l._id === this.contextListUuid).title;
      console.log(title);
      this.listRenameInput.nativeElement.value = title;
      this.listRenameInput.nativeElement.focus();
    });
  }

  contextMenu($event: MouseEvent, template: NzDropdownMenuComponent, uuid: string): void{
    this.dropdown = template;
    this.dropdownService.create($event,template);
    this.contextListUuid = uuid;
  }

  click(uuid: string): void{
    this.listService.setCurrentUuid(uuid);
  }

  rename(title: string): void{
    this.listService.rename(this.contextListUuid, title);
    this.closeRenameListModal();
  }

  add(title: string): void {
    this.listService.add(title);
    this.closeAddListModal();
  }

  delete(): void {
    const uuid = this.contextListUuid;
    this.modal.confirm({
      nzTitle: '确认删除列表',
      nzContent: '该操作会导致该列表下的所有待办事项被删除',
      nzOnOk: () => new Promise((res,rej) => {
        this.listService.delete(uuid);
        this.todoService.deleteInList(uuid);
        res();
      }).catch(() => console.error('Delete list failed'))
    });
  }

  close(): void {
    // this.dropdown.close();
    this.dropdownService.close();
  }
}

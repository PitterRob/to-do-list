import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TaskRoutingModule } from "./task-routing.module";
import { TaskListComponent } from "./task-list/task-list.component";
import { ModalTaskComponent } from "./modals/modal-task/modal-task.component";

import { TaskService } from "./task.service";
import { BsModalRef, ModalModule } from "ngx-bootstrap/modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [TaskListComponent, ModalTaskComponent],
  providers: [TaskService, BsModalRef],
  entryComponents: [ModalTaskComponent],
})
export class TaskModule {}

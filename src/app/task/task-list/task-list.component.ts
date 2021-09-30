import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { Task } from "src/app/model/task.model";
import { ModalTaskComponent } from "../modals/modal-task/modal-task.component";
import { TaskService } from "../task.service";
import { finalize, first } from "rxjs/operators";
@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.less"],
})
export class TaskListComponent implements OnInit {
  tarefas: Task[];
  bsModalRef: BsModalRef;
  public loading: boolean = false;
  constructor(
    private taskService: TaskService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.taskService
      .getAll()
      .pipe(
        first(),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        this.tarefas = data;
        console.log(this.tarefas);
      });
  }

  public adicionarTask(): void {
    const initialState: ModalOptions = {
      initialState: {
        data: {
          id: null,
          title: "",
          description: "",
          priority: "",
          expire: "",
        },
        titulo: "Nova tarefa",
        acao: "Adicionar",
      },
      backdrop: true,
      ignoreBackdropClick: false,
    };
    this.bsModalRef = this.modalService.show(ModalTaskComponent, initialState);
    this.bsModalRef.content.onClose.subscribe((result) => {
      if (result.title) {
        this.loading = true;
        this.taskService
          .adicionar(result)
          .pipe(
            first(),
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe((data) => {
            console.log(data);
            this.refreshTask();
          });
      }
    });
  }

  public editar(tarefa): void {
    const initialState: ModalOptions = {
      initialState: {
        data: {
          id: tarefa.id,
          title: tarefa.title,
          description: tarefa.description,
          priority: tarefa.priority,
          expire: tarefa.expire,
        },
        titulo: "Editar tarefa",
        acao: "Salvar",
      },
      backdrop: true,
      ignoreBackdropClick: false,
    };
    this.bsModalRef = this.modalService.show(ModalTaskComponent, initialState);
    this.bsModalRef.content.onClose.subscribe((result) => {
      if (result.id) {
        this.loading = true;
        this.taskService
          .alterar(result.id, result)
          .pipe(
            first(),
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe((data) => {
            console.log(data);
            this.refreshTask();
          });
      }
    });
  }
  public deletar(id: number): void {
    this.loading = true;
    this.taskService
      .deletar(id)
      .pipe(
        first(),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.refreshTask();
      });
  }
  public refreshTask() {
    this.tarefas = [];
    this.loading = true;
    this.taskService
      .getAll()
      .pipe(
        first(),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        this.tarefas = data;
        console.log(this.tarefas);
      });
  }
}

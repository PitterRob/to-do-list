import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, ModalOptions } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { Task } from "src/app/model/task.model";

@Component({
  selector: "app-modal-task",
  templateUrl: "./modal-task.component.html",
  styleUrls: ["./modal-task.component.less"],
})
export class ModalTaskComponent implements OnInit {
  public formulario: FormGroup;
  data: Task;
  titulo: string;
  acao: string;
  public onClose: Subject<any>;

  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    public options: ModalOptions
  ) {}

  ngOnInit() {
    this.formulario = this.getNovoFormulario();
    this.onClose = new Subject();
    console.log(this.titulo);
  }

  confirm() {
    this.onClose.next(this.formulario.getRawValue());
    this.bsModalRef.hide();
  }
  private getNovoFormulario(): FormGroup {
    return this.formBuilder.group({
      id: [this.data.id],
      title: [this.data.title, Validators.required],
      description: [this.data.description, Validators.required],
      priority: [this.data.priority, Validators.required],
      expire: [this.data.expire, Validators.required],
    });
  }

  close() {
    this.onClose.next(this.formulario.getRawValue());
    this.bsModalRef.hide();
  }
}

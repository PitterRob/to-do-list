import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Task } from "../model/task.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  url = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tarefas`);
  }

  public alterar(id: number, tarefa: Task) {
    const headers = new HttpHeaders({ "content-type": "application/json" });
    return this.http.put<Task>(`${this.url}/tarefas/${id}`, tarefa, {
      headers,
    });
  }
  public adicionar(tarefa: Task) {
    const headers = new HttpHeaders({ "content-type": "application/json" });
    return this.http.post<Task>(`${this.url}/tarefas`, tarefa, {
      headers,
    });
  }
  public deletar(id: number) {
    const headers = new HttpHeaders({ "content-type": "application/json" });
    return this.http.delete<Task>(`${this.url}/tarefas/${id}`, {
      headers,
    });
  }
}

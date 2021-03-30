import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as fromFiltros from 'src/app/filter/filter.action'
import * as fromTodos from 'src/app/todo/todo.actions'
import { Todo } from '../model/todo.model';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {
  filtros: fromFiltros.filtrosValidos[] = ['todos', 'completados','pendientes']
  filtroActual: fromFiltros.filtrosValidos
  pendientes: number
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos)
      this.filtroActual = state.filtro
    })
  }

  cambiarFiltro(nuevoFiltro: fromFiltros.filtrosValidos) {
    const accion = new fromFiltros.SetFiltroAction(nuevoFiltro)
    this.store.dispatch(accion)
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length
  }

  limpiarTodos() {
    const accion = new fromTodos.LimpiarTodoAction()
    this.store.dispatch(accion)
  }
}

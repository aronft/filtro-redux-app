import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import * as fromTodo from 'src/app/todo/todo.actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: []
})
export class TodosItemComponent implements OnInit {
  @ViewChild('txtInputFisico', {static: false}) txtInputFisico: ElementRef
  @Input() todo: Todo
  chkField: FormControl
  txtInput: FormControl
  editando = false

  constructor(private store: Store<AppState>) { }
  
  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado)
    this.txtInput = new FormControl(this.todo.texto, Validators.required)

    this.chkField.valueChanges.subscribe(value => {
      const accion = new fromTodo.ToggleTodoAction(this.todo.id)
      this.store.dispatch(accion)
    })
  }

  editar() {
    this.editando = true
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select()
    }, 1);
  }

  terminarEdicion() {
    
    this.editando = false
    if (this.txtInput.invalid) {
      return
    }

    if (this.txtInput.value === this.todo.texto) {
      return
    }

    const accion = new fromTodo.EditarTodoAction(this.todo.id, this.txtInput.value)
    this.store.dispatch(accion)
  }

  eliminarTodo() {
    const accion = new fromTodo.BorrarTodoAction(this.todo.id)
    this.store.dispatch(accion)
  }
}

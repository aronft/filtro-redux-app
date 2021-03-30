import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as fromTodo from 'src/app/todo/todo.actions'
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: []
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.txtInput = new FormControl('', Validators.required)
  }

  agregarTodo() {
   
    if (this.txtInput.invalid) {
      return
    }

    const accion = new fromTodo.AgregarTodoAction(this.txtInput.value)
    this.store.dispatch(accion)

    this.txtInput.setValue('')
    
  }


}

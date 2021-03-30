import { ActionReducerMap } from '@ngrx/store';
import { Todo } from './todo/model/todo.model';

import * as fromTodo from 'src/app/todo/todo.reducer'
import * as fromReducer from 'src/app/filter/filter.reducer'
import * as fromFiltrosActions from 'src/app/filter/filter.action'

export interface AppState {
    todos: Todo[]
    filtro: fromFiltrosActions.filtrosValidos
}

export const appReducers: ActionReducerMap<AppState> ={
    todos: fromTodo.todoReducer,
    filtro: fromReducer.filtroReducer
}
import { Todo } from './model/todo.model'
import * as fromTodo from './todo.actions'

const todo1 = new Todo('Vencer a tanos')
const todo2 = new Todo('Salvar el mundo')
const todo3 = new Todo('Ver anime')
todo1.completado = true

const estadoInicial: Todo[] = [todo1, todo2, todo3]
export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {

    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto)
            return [...state, todo]

        case fromTodo.TOGGLE_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id ===  action.id) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    }
                }
                return todoEdit
            } )

        case fromTodo.EDITAR_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    }
                }
                return todoEdit
            })
        case  fromTodo.BORRAR_TODO:
            return state.filter(todoEdit => todoEdit.id !== action.id)

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                }
            })

        case fromTodo.LIMPIAR_TODO: 
            return  state.filter(todo => !todo.completado)
        default:
            return state
    }
}
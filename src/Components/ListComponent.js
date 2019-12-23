import Component from "./component.js";
import store from "../store/index.js";
import link from "../router/link.js";
import {backend} from "../service/Back.js"


export default class ListComponent extends Component {
    constructor(app, settings) {
        const template = document.getElementById('list').content.cloneNode(true);
        app.append(template);

        super(
            store,
            document.querySelector('.js-items')
        )

        backend.getToDo().then(
            res => store.dispatch('addItems',res)
        )

        const input = document.querySelector('.c-input-field');
        const submit = document.querySelector('.c-button');
        const handleClick = event => {
            event.preventDefault();
            let value = input.value.trim();
            if (value.length) {
                backend.createToDo(value,new Date().toDateString(),false)
                    .then(res =>store.dispatch('addItem',res ))
                input.focus();
            }
            input.value= '';
        }


        submit.addEventListener('click', handleClick);


        app.querySelector('#exitbutton').addEventListener('click', () => {
            localStorage.clear();
            link('login');
        })

        this.initFilterListeners(app);
    }

    deleteItem(event){
        const id = event.target.dataset.id;
        backend.deleteTodo(id)
            .then(() => store.dispatch('removeItem', { id }))
    }

    switchCheckbox(event){
        const id = event.target.dataset.id;
        backend.updateTodoStatus(id,event.target.checked)
            .then(()=> store.dispatch('toggleCompleted', {id}))
    }


    editThisField(event){
        if(event.keyCode===13){
            const id = event.target.dataset.id;
            const input = event.target;
            backend.updateTodoText(id,input.value)
                .then((res)=>
                    store.dispatch('updateItem',res))
        }
    }


    visibleOfEditWindow(event){
        const id = event.target.dataset.id;
        const inputId =  this.anchor.querySelector(`#edit-${CSS.escape(id)}`);
        const spanId =  this.anchor.querySelector(`#span-${CSS.escape(id)}`);
        inputId.value = spanId.dataset.text;
        spanId.style.display = 'none';
        inputId.style.display = 'block';
    }


    initFilterListeners(app){
        app.querySelector('#todo-completed-filter').addEventListener('click', function(event){
            this.filter = 'checked';
            this.render();
        }.bind(this));
        app.querySelector('#all-todo-filter').addEventListener('click', function(event){
            this.filter = '';
            this.render();
        }.bind(this));
        app.querySelector('#todo-not-completed-filter').addEventListener('click', function(event){
            this.filter = 'unchecked';
            this.render();
        }.bind(this));
    }


    render() {


        if (store.state.todo.length === 0) {
            this.anchor.innerHTML = "<div class='no-todos-text'>NO TODO`S,YOU ARE FREE</div>";
            return;
        }
        let todo = store.state.todo;

        if(this.filter==='checked'){
           todo = store.state.todo.filter((todoItem) => todoItem.completed)
        }

        if(this.filter==='unchecked'){
            todo = store.state.todo.filter((todoItem) => !todoItem.completed)
        }


        this.anchor.innerHTML = `
           <div class="todo-items-style">
                  ${
                     todo.map(todoItem => `
                         <div class="this-todo" data-id="${todoItem._id}" >
                            <span class="edit-field ${todoItem.completed?"underline-text":""}" data-id="${todoItem._id}" data-text="${todoItem.text}" id="span-${todoItem._id}">
                                ${todoItem.text} created at ${todoItem.createDate}</span>
                                <input class="editTodo" data-id="${todoItem._id}" id="edit-${todoItem._id}">
                             <div class="buttonsInforma" id="${todoItem._id}">
                                <input class="checkbox" type="checkbox" data-id="${todoItem._id}" ${todoItem.completed?"checked":""}>
                                <button type="button" data-id="${todoItem._id}">X</button>
                             </div>
                         </div>
                      `).join('')
                   }
             </div>
        `;

        this.anchor.querySelectorAll('.editTodo').forEach((field) =>
            field.addEventListener('keyup',this.editThisField.bind(this)));

        this.anchor.querySelectorAll('.edit-field').forEach(field =>
            field.addEventListener('click',this.visibleOfEditWindow.bind(this)));

        this.anchor.querySelectorAll('.checkbox').forEach((checkbox) =>
            checkbox.addEventListener('click',this.switchCheckbox.bind(this)));

        this.anchor.querySelectorAll('button').forEach((button) =>
            button.addEventListener('click', this.deleteItem.bind(this)));
    }
}
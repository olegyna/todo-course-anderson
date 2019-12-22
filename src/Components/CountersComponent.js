import Component from "./component.js";
import store from "../store/index.js";

export default class CountersComponent extends Component {
    constructor(app, settings) {
    super(
        store,
        document.querySelector('.counter')
    );
    }

    render(){


    const todoLenght = store.state.todo.length;
    const todoCompletedLenght = store.state.todo.filter((todoItem) => todoItem.completed).length;
    const todoNotCompletedLenght= store.state.todo.filter((todoItem) => !todoItem.completed).length;
    this.anchor.innerHTML= `
        <div class="counter">
            count of todos- ${todoLenght}
            need to complete- ${todoCompletedLenght}
            not completed todos- ${todoNotCompletedLenght}
        </div>`


    }
}
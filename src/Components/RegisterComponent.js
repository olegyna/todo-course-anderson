import Component from "./component.js";
import store from "../store/index.js";
import link from "../router/link.js";
import {backend} from "../service/Back.js";

export default class RegisterComponent extends Component {
    constructor(app, settings) {
        const template = document.getElementById( 'register').content.cloneNode(true);
        app.appendChild(template);
        super(
            store,
            app
        );
        const  inputUserName = app.querySelector('#username');
        const inputEmail = app.querySelector('#register-email');
        const inputPass = app.querySelector('#register-password');
        app.querySelector('#register-button').addEventListener('click', () => {
            backend.register(inputEmail.value, inputPass.value, inputUserName.value).then(
                () => link('login'),
            );
        });
        app.querySelector('#go-back').addEventListener('click', () => link('login'));
    }


    render() {}
}
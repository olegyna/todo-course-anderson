import Component from "./component.js";
import store from "../store/index.js";
import link from "../router/link.js";
import {backend} from "../service/Back.js";

export default class LoginComponent extends Component {
    constructor(app, settings) {
        const template = document.getElementById( 'login').content.cloneNode(true);
        app.appendChild(template);
        super(
            store,
            app
        );
        const inputEmail = app.querySelector('#email');
        const inputPass = app.querySelector('#password');
        app.querySelector('#toRegister').addEventListener('click', () => {
            link('register')
        });

        app.querySelector('#signIn').addEventListener('click', () => {
            backend.login(inputEmail.value,inputPass.value).then(
                (res) => {
                    console.log(res);
                    if(res){
                        link('list')
                    }
                },

            );
            console.log(settings);
        });
    }

    render() {
        console.log('login render');
    }
}
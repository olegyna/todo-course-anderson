import store from "../store/index.js";

class AuthStorage {
    constructor() {
        this.data = JSON.parse(localStorage.getItem('my-items')) ||{};
    }
    getElement(key) {
        return this.data[key];
    }
    setElement(key,value) {
        this.data[key] = value;
        localStorage.setItem('my-items', JSON.stringify(this.data));
    }
}

class Backend {
    constructor(store, authStorage) {
        this.store = store;
        this.authStorage = authStorage;
        this.url = 'https://todo-app-back.herokuapp.com';
    }

    register(email, password, username) {
        return fetch(this.url + '/register', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                username,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res =>{
            if(!res.ok){
                return Promise.reject('pyk')
            }
            return Promise.resolve(res.json())
        })
    }

    login(email, password) {
        return fetch(this.url + '/login', {
            method: 'POST',
            body:
                JSON.stringify({
                    email,
                    password,
                }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res =>{
                if(!res.ok){
                    return Promise.reject('pyk')
                }
                return Promise.resolve(res.json())
            })
            .then(res => {
                console.log(res);
                this.authStorage.setElement('token', res.token);
                return true;
            })
            .catch(() =>false)
    }

    // checkAuth() {
    //     return fetch(this.url + '/me', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': this.authStorage.getElement('token'),
    //         },
    //     }).then(res =>{
    //         if(!res.ok){
    //             return Promise.reject('pyk')
    //         }
    //         return Promise.resolve(res.json())
    //     })
    // }

    createToDo(text, createDate, completed) {
         return fetch(this.url + '/todos', {
            method: 'POST',
            body:
                JSON.stringify({
                    text,
                    createDate,
                    completed,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getElement('token'),
            },
        }).then(res =>{
             if(!res.ok){
                 return Promise.reject('pyk')
             }
             return Promise.resolve(res.json())
         })

    }

    getToDo() {
        return fetch(this.url + '/todos', {
            method: 'GET',
            headers: {
                'Authorization': this.authStorage.getElement('token'),
            },
        }).then(res =>{
            if(!res.ok){
                return Promise.reject('pyk')
            }
            return Promise.resolve(res.json())
        })
    }
//not needed
    // getToDoById(id) {
    //     return fetch(this.url + `/todos/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': this.authStorage.getElement('token'),
    //         },
    //     }).then(res =>{
    //         if(!res.ok){
    //             return Promise.reject('pyk')
    //         }
    //         return Promise.resolve(res.json())
    //     })
    // }

    updateTodoText(id, text) {
        return fetch(this.url + `/todos/${id}`, {
            method: 'PUT',
            body:
                JSON.stringify({
                    text,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getElement('token'),
            },
        }).then(res =>{
            if(!res.ok){
                return Promise.reject('pyk')
            }
            return Promise.resolve(res.json())
        })
    }

    updateTodoStatus(id, completed) {
        return fetch(this.url + `/todos/${id}`, {
            method: 'PUT',
            body:
                JSON.stringify({
                    completed,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getElement('token'),
            },
        }).then(res =>{
            if(!res.ok){
                return Promise.reject('pyk')
            }
            return Promise.resolve(res.json())
        })
    }

    deleteTodo(id) {
        return fetch(this.url + `/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authStorage.getElement('token'),
            }
        })
            .then(res =>{
                if(!res.ok){
                    return Promise.reject('pyk')
                }
                return Promise.resolve(res.json())
            })
    }

}




const authStorage = new AuthStorage;
export  const backend = new Backend(store, authStorage);

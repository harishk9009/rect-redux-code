import axios from 'axios';
// read data from users static json file
import { users } from '../assets/users.json'

export function setUpBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/login') && method === 'POST':
                        return login();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function login() {
                const { username, password } = body;
                let usersList = '';
                if (localStorage.getItem('users')) {
                    usersList =  JSON.parse(localStorage.getItem('users'));
                    
                } else {
                    usersList = users;
                }
                let userIfo = usersList.find(x => x.user.username === username && x.user.password === password);
                 if (!userIfo) return error('Username or password is incorrect');
                return ok({
                    title: userIfo.user.name.title,
                    firstname: userIfo.user.name.first,
                    lastname: userIfo.user.name.last,
                    username: userIfo.user.username,
                    email: userIfo.user.email,
                    dob: userIfo.user.dob,
                    phone: userIfo.user.phone,
                    token: 'jwt-token'
                });
            }

            function register() {
                const user = body;
                let usersList =  JSON.parse(localStorage.getItem('users'));
                if (usersList.find(x => x.user.username === user.username)) {
                    return error(`Username  ${user.username} is already taken`);
                }
                user.id = usersList.length ? Math.max(...usersList.map(x => x.id)) + 1 : 1;
               
                let newUser = {'user' : user}
                usersList.push(newUser);

                localStorage.setItem('users', JSON.stringify(usersList));

                return ok();
            }

            function getUsers() {
                if (!isLoggedIn()) return unauthorized();
                else {
                    if (localStorage.getItem('users')) {
                        return ok(JSON.parse(localStorage.getItem('users')));
                    } else {
                        axios.get(`https://randomuser.me/api/0.8/?results=20`)
                            .then(response => {
                                localStorage.setItem('users', JSON.stringify(response.data.results));
                                return ok(response.data.results);
                            })
                    }


                }
            }


            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function isLoggedIn() {
                return headers['Authorization'] === 'Bearer jwt-token';
            }

        });
    }
}
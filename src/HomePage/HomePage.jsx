import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
    const [message, setMessage] = useState('');
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);


    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstname} {user.lastname}!</h1>
            <p>You're logged - <Link to="/login">Logout</Link></p>
            <h4>All registered users: - <Link to="/Register">Add new user</Link></h4>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <div>
                    <ul>
                        {users.items.filter(data => data.user.name.first.includes(message)).map((item, index) =>
                            <li key={index}>
                                {item.user.name.first} {item.user.name.last}

                            </li>
                        )}
                    </ul>
                    <input className="form-control"
                        type="text"
                        value={message}
                        placeholder="Enter a message"
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
            }

            <p>
                
                
            </p>
        </div>
    );
}

export { HomePage };
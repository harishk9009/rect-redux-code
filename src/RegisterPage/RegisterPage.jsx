import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        gender: 'Male',
        name: {
            title: '',
            first: '',
            last: ''
        },
        email: '',
        username: '',
        password: '',
        dob: '',
        phone: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        if (e.target.name == 'first' || e.target.name == 'title' || e.target.name == 'last') {
            setUser({
                ...user,
                name: { ...user.name, [name]: value }
            });
        } else {
            setUser(user => ({ ...user, [name]: value }));
        }

    }

    function handleSubmit(e) {
        e.preventDefault();

        //setSubmitted(true);
        if (user) {
            //e.preventDefault();
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register - New User</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={user.name.title} onChange={handleChange} className={'form-control' + (submitted && !user.name.title ? ' is-invalid' : '')} />
                    {submitted && !user.name.title &&
                        <div className="invalid-feedback">Title is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first" value={user.name.first} onChange={handleChange} className={'form-control' + (submitted && !user.name.first ? ' is-invalid' : '')} />
                    {submitted && !user.user.name.first &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last" value={user.name.last} onChange={handleChange} className={'form-control' + (submitted && !user.name.last ? ' is-invalid' : '')} />
                    {submitted && !user.Name.last &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="gender" value='Male' checked={user.gender === "Male"} onChange={handleChange} />Male
                    </label>
                </div>      <div className="form-check-inline">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="gender" value='Female' checked={user.gender === "Female"} onChange={handleChange} />Female
                    </label>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>DOB</label>
                    <input type="password" name="dob" value={user.dob} onChange={handleChange} className={'form-control' + (submitted && !user.dob ? ' is-invalid' : '')} />
                    {submitted && !user.dob &&
                        <div className="invalid-feedback">DOB is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="password" name="phone" value={user.phone} onChange={handleChange} className={'form-control' + (submitted && !user.phone ? ' is-invalid' : '')} />
                    {submitted && !user.phone &&
                        <div className="invalid-feedback">phone is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };
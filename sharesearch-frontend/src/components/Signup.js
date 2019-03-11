import React, { Component } from 'react'
import SpecialtyForm from './SpecialtyForm'

const DEFAULT_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '', 
    passwordConfirm: '',
    specialties: [],
    edLevel: '',
    degree: '',
    institution: '',
    position: ''
}

class Signup extends Component {

    state = {
        ...DEFAULT_STATE
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.password === this.state.passwordConfirm) {
            const body = {
                user: {
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,
                    specialties: this.state.specialties,
                    ed_level: this.state.edLevel,
                    degree: this.state.degree,
                    institution: this.state.institution,
                    position: this.state.position
                }
            }
    
            fetch('http://localhost:3000/api/v1/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('token', data.jwt)
                this.props.history.push('/profile')
            })
    
            this.setState({
                ...DEFAULT_STATE
            })
        } else {
            alert('Passwords do not match')
        }
    }

    handleChangeSpecialty = (id, checked) => {
        checked ? 
        this.setState( prevState => ({ specialties: prevState.specialties.filter(sId => sId !== id) }) )
        :
        this.setState( prevState => ({ specialties: prevState.specialties.concat(id) }) )
    }

    render() {
        return(
            <>
            <h1>sharesearch</h1>
            <h3>signup below:</h3>
            <form onSubmit={ this.handleSubmit }>
                First Name:
                <input 
                    type='text' 
                    name='firstName'
                    value={ this.state.firstName } 
                    onChange={ this.handleChange }
                />
                <br />

                Last Name:
                <input 
                    type='text' 
                    name='lastName'
                    value={ this.state.lastName } 
                    onChange={ this.handleChange }
                />
                <br />

                Email:
                <input 
                    type='text' 
                    name='email'
                    value={ this.state.email } 
                    onChange={ this.handleChange }
                />
                <br />

                Username:
                <input 
                    type='text' 
                    name='username'
                    value={ this.state.username } 
                    onChange={ this.handleChange }
                />
                <br />

                Password:
                <input 
                    type='password' 
                    name='password'
                    value={ this.state.password } 
                    onChange={ this.handleChange }
                />
                <br />

                Confirm your password:
                <input 
                    type='password' 
                    name='passwordConfirm'
                    value={ this.state.passwordConfirm } 
                    onChange={ this.handleChange }
                />
                <br />

                Choose your area(s) of specialty:
                <SpecialtyForm 
                    specialties={ this.state.specialties } 
                    handleChange={ this.handleChangeSpecialty } 
                />
                <br />

                Select your highest level of education:
                <select 
                    name='edLevel'
                    value={ this.state.edLevel }
                    onChange={ this.handleChange }
                >
                    <option defaultValue="">Please select...</option>
                    <option value="hs">High School</option>
                    <option value="associate">Associate's</option>
                    <option value="bachelor">Bachelor's</option>
                    <option value="master">Master's</option>
                    <option value="doctoral">Doctoral</option>
                </select>
                <br />

                Enter your degree(s) and/or credentials (if applicable):
                <input 
                    type='text' 
                    name='degree'
                    value={ this.state.degree } 
                    onChange={ this.handleChange }
                />
                <br />

                Institution:
                <input 
                    type='text' 
                    name='institution'
                    value={ this.state.institution } 
                    onChange={ this.handleChange }
                />
                <br />

                Position:
                <input 
                    type='text' 
                    name='position'
                    value={ this.state.position } 
                    onChange={ this.handleChange }
                />
                <br />

                <input type='submit' value='Create My Account' />
            </form> 
            </>
        )
    }
}

export default Signup
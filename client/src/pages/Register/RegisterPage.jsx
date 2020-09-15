import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './RegisterPage.css'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/registerAction'
import { NotificationManager } from 'react-notifications';

class RegisterPage extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        city: "",
        state: "",
        image: "",
        phone: "",
    }

    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handelSubmit = e => {
        e.preventDefault()
        this.props.registerUser({...this.state})
    }

    handelSingleFile = e => {
        const image = e.target.files[0]
        this.setState({ image })
    }

    render() {
        return (
            <div className='parentDiv'>
            <div className="box" >
                <div className='heading' >
                    <h2>
                        Create an account
                    </h2>
                    <h2 style={{ marginLeft: '5px', marginRight: '5px' }}>or</h2>
                    <span><Link to='/signin' > Sign In</Link> </span>
                </div>
                <p>Use your Google Account</p>
                <form>
                    {this.props.error !== [] && this.props.error !== undefined ?this.props.error.map(er=>er.param ==='unauthourize'?<p  style={{color: 'red', marginLeft: 10, marginBottom: 20}} >{er.message}</p>: null):null}
                    <div className='inputBox'>
                        <input type="text" name='name' onChange={this.handelChange} value={this.state.name} required />
                        <label>Username</label>
                    </div>
                    <div className='inputBox'>
                        <input type="email" name='email' onChange={this.handelChange} value={this.state.email} required />
                        <label>Email</label>
                    </div>
                    <div className='inputBox'>
                        <input type="password" name='password' onChange={this.handelChange} value={this.state.password} required />
                        <label>Password</label>
                    </div>                    
                    <div className='inputBox'>
                        <input type="text" name='city' onChange={this.handelChange} value={this.state.city} required />
                        <label>City</label>
                    </div>                    
                    <div className='inputBox'>
                        <input type="text" name='state' onChange={this.handelChange} value={this.state.state} required />
                        <label>State</label>
                    </div>                    
                    <div className='inputBox'>
                        <input type="number" name='phone' onChange={this.handelChange} value={this.state.phone} required />
                        <label>Phone Number</label>
                    </div>
                    <input type="file" name='image' onChange={this.handelSingleFile} required />
                    <div >
                    <input type="submit" onClick={this.handelSubmit} value="Sign up" />
                    </div>
                </form>
                {this.props.user!==null && this.props.error !== undefined? NotificationManager.success('Student registerdd successfully', 'Success') : null}                
            </div>
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        user: storeState.registerState.user,
        error: storeState.registerState.error
    }
}


export default connect(mapStateToProps, {registerUser})(RegisterPage)

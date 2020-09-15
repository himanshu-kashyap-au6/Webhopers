import React, { Component } from 'react'
import '../Register/RegisterPage.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/loginUser'
import { Redirect } from 'react-router-dom'

class SignInPage extends Component {

    state = {
        email: "",
        password: ""
    }
    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handelSubmit = e => {
        e.preventDefault()
        this.props.loginUser({...this.state})
    }

    render() {
        return (
            <div className='parentDiv'>

            <div className="box" >
                <div className='heading' >
                    <h2>
                        SignIn  
                    </h2> 
                    <h2 style={{ marginLeft: '5px', marginRight: '5px' }}>or</h2>
                    <span><Link to='/register' > createa an account </Link> </span>
                </div>
                <br/>
                <form>
                    {this.props.error !== null && this.props.error !== undefined ?<p style={{color: 'red'}} >Incorrect credentials</p>: null }
                    {this.props.user !== null && this.props.user !== undefined ? <Redirect to='/dashboard' /> : <Redirect to='/signin' /> }
                    <div className='inputBox'>
                        <input type="email" name='email' onChange={this.handelChange} value={this.state.email} required />
                        <label>Email *</label>
                    </div>
                    <div className='inputBox'>
                        <input type="password" name='password' onChange={this.handelChange} value={this.state.password} required />
                        <label>Password *</label>
                    </div>
                    <input type="submit" onClick={this.handelSubmit} value="Sign In" />
                </form>                
            </div>
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
        error: storeState.loginState.error
    }
}

export default connect(mapStateToProps, {loginUser})(SignInPage)
// export default SignInPage

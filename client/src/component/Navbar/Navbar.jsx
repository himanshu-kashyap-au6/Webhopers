import React, {Component} from 'react'
import Style from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutUser } from '../../redux/actions/loginUser'
class Navbar extends Component {
    handelClick = () =>{
        this.props.logOutUser()
    }
    render(){
        return (
            <div className={Style.parent} >
                <NavLink className={Style.navLink} to='/' >Home</NavLink>
                {this.props.user!==null?
                <>
                <NavLink className={Style.navLink} to='/dashboard' >Profile</NavLink>
                <NavLink className={Style.navLink} to='/' onClick={ this.handelClick } >Logout</NavLink>
                </>:
                <>
                <NavLink className={Style.navLink} to='/register' >Register</NavLink>
                <NavLink className={Style.navLink} to='/signin' >Sign In</NavLink>
                </>
                }
            </div>
        )
    }
}
const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
    }
}

export default connect(mapStateToProps, {logOutUser})(Navbar)

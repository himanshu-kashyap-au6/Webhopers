import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfile, updateProfile } from '../../redux/actions/profileAction'
import "./Dashboard.css"

class Dashboard extends Component {
    state = {
        update: false,
        changePassword: false,
        name: "",
        city: "",
        state: "",
        phone: "",
        password: ""
    }

    componentDidMount(){
        this.props.getProfile()
    }

    handelClick = () =>{
        this.setState({update: !this.state.update})
        this.setState({changePassword: false})
    }
    
    handelClickP = () =>{
        this.setState({changePassword: !this.state.changePassword})
        this.setState({update: false})
    }

    handelChange = e =>{
        this.setState({ [e.target.name]: e.target.value })
    }

    handelSingleFile = e => {
        if(e.target.files[0]!== undefined){
            const image = e.target.files[0]
            this.setState({ image })
        }
    }
    handelSubmit = e =>{
        e.preventDefault()
        this.props.updateProfile({...this.state})
        setTimeout(()=>{
            this.props.getProfile()
        }, 5000)
    }
    render(){
        return (
            this.props.user!==null?
            <div className="DashParent" >
                {this.props.profile!==null && this.props.profile!== undefined? 
                <div>
                    <img src={this.props.profile.student.image} style={{width: "250px", height: "250px", marginTop: "20px", borderRadius: "50%"}} alt="ProfileImage"/>
                    <h1>Name: {this.props.profile.student.name}</h1>
                    <h2>Email: {this.props.profile.student.email}</h2>
                    <h3>City: {this.props.profile.student.city}</h3>
                    <h3>State: {this.props.profile.student.state}</h3>
                    <h3>Contact no.: {this.props.profile.student.phone}</h3>
                    <button onClick={this.handelClick} >Update Profile</button>
                    <button onClick={this.handelClickP} >Change Password</button>
                    {
                    this.state.update && 
                    <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around', width: "calc(100vw-20px)", margin: '10px'}} className="input-fields">
                        <form encType='multipart/form-data' >
                            <input type="text" name='name' onChange={this.handelChange} value={this.state.name} className="input" placeholder="Name" />
                            <input type="text" name='city' onChange={this.handelChange} value={this.state.city} className="input" placeholder="City" />
                            <input type="text" name='state' onChange={this.handelChange} value={this.state.state} className="input" placeholder="State" />
                            <input type="number" name='phone' onChange={this.handelChange} value={this.state.phone} className="input" placeholder="Phone Number" />
                            <input type="file" name='image' onChange={this.handelSingleFile}  />
                            <button className={"no-focusborder"} type='submit' onClick={this.handelSubmit} >Update</button>
                        </form>
                    </div>
                    }
                    {this.state.changePassword &&
                    <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around', width: "calc(100vw-20px)", margin: '10px'}} className="input-fields">
                        <form encType='multipart/form-data'  >
                        <input type="password" name='password' onChange={this.handelChange} value={this.state.password} className="input" placeholder="Password" />
                        <button className={"no-focusborder"} type='submit' onClick={this.handelSubmit} >Change</button>
                        </form>
                    </div>}
                </div>
                :null}
            </div>
            :
            <Redirect to='/signin' />
        )
    }
}
const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
        profile: storeState.profileState.profile
    }
}
export default connect(mapStateToProps, {getProfile, updateProfile})(Dashboard)

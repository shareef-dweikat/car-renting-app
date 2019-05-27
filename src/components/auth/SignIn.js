import React, { Component } from 'react'
import { connect } from 'react-redux'
 import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  render() {
    
      //if an email exists in the store that means a user  is logged in.
      //if a user requests sign in form while he is logged in, redirect him/her to main page (cars list)
     const { email,authError } = this.props;
      if (email) return <Redirect to='/' /> 

    return (
      <div className='container' style={{width:600}}>    

        <h5>Sign In</h5>

        <form className="white" onSubmit={(e)=>this.handleSubmit(e)}>
              <div className="input-field" style={{marginTop:16}}>
                  <label htmlFor="email">Email</label>
                  <input type="text" id='email' onChange={(e)=>this.handleChange(e)}  value={this.state.email} />
              </div>

              <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input type="text" id='password'  onChange={(e)=>this.handleChange(e)} value={this.state.password} />
              </div>
              <div className="input-field">
                   <button className="btn pink lighten-1 z-depth-0" style={{marginRight:8}}>Sign In</button>
              <div className="center red-text">
              { <p>{this.props.authError?authError:null}</p> }
               </div>
              </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    email: state.auth.email
  }
}


const mapDispatchToProps=(dispatch)=>{

  return{
    signIn: (creds) => dispatch(signIn(creds)),
  }
}
 export default connect(mapStateToProps,mapDispatchToProps)(SignIn)

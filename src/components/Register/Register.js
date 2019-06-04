import React from 'react';

const formErrors={
	nameError:'',
	emailError:'',
	passwordError:''
}
const initialState={
	email:'',
	password:'',
	name:'',
	error:'',
	formErrors
}
class Register extends React.Component {
	constructor(props){
		super(props)
		this.state=initialState
	}
	validate=()=>{
		let emailError='';
		let passwordError='';
		let nameError='';
		if (!this.state.email.includes('@' && '.')){
			emailError='*Invalid Email';
		}
		if(!this.state.email){
			emailError='*Email Required';
		}
		if(this.state.password.length<6){
			passwordError='*Password must be of 6 digits';
			if(!this.state.password){
				passwordError='*Password Required';
			}
		}
		if(!this.state.name){
			nameError='*Name Required';
		}
		if(emailError || passwordError || nameError){
			this.setState({emailError,passwordError,nameError})
			return false
		}
		return true
	}
	onEmailChange=(event)=>{
		this.setState({email:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({password:event.target.value})
	}
	onNameChange=(event)=>{
		this.setState({name:event.target.value})
	}
	onRegisterSubmit=()=>{
		const isValid = this.validate()
		if(isValid){
			fetch("https://secret-mountain-68931.herokuapp.com/register",{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
					name:this.state.name,
					email:this.state.email,
					password:this.state.password
				})
			})
			.then(response=>response.json())
			.then(user=>{
				if(user.id){
					this.props.loadUser(user)
					this.props.onRouteChange('home')
				}else {
					this.setState({error:user})
				}
			})
			.catch(console.log)
			this.setState(formErrors)
		}
	}
	render(){
		const {onRouteChange}=this.props
		const {onEmailChange,onPasswordChange,onRegisterSubmit,onNameChange}=this
		const {emailError,passwordError, nameError} = this.state
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input 
				        onChange={onNameChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
				        type="name" 
				        name="name"  
				        id="name"
				        />
				        <div className="db fw6 lh-copy f6 red">{nameError}</div>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        onChange={onEmailChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        />
				         <div className="db fw6 lh-copy f6 red">{emailError}</div>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password"
				        minLength="6"
				        onChange={onPasswordChange}/>
				         <div className="db fw6 lh-copy f6 red">{passwordError}</div>
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      onClick={onRegisterSubmit} 
				      className="b ph3 pv2 shadow-3 link input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Register"/>
				    </div>
				    <div className="lh-copy mt3">
				      <label className="db fw6 lh-copy f6">Already a user?</label>
				      <p onClick={()=>onRouteChange('signin')} className="f6 link dim shadow-3 black b ph3 pv2 ba b--black bg-transparent grow pointer dib db pointer">Sign in</p>
				    </div>
				    {//Server Form Validation
			      		this.state.error==="Unable to register"
			      		?<label className="db fw6 lh-copy f6 red">*Email Already Registered</label>
			      		:null
				    }
				  </div>
				</main>
			</article>
		)
	}
}
export default Register;
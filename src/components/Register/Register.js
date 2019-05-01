import React from 'react';

class Register extends React.Component {
	constructor(props){
		super(props)
		this.state={
			email:'',
			password:'',
			name:'',
			error:''
		}
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
				console.log(this.state)
			}
		})
		.catch(console.log)
	}
	render(){
		const {onRouteChange}=this.props
		const {onEmailChange,onPasswordChange,onRegisterSubmit,onNameChange}=this
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
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="name" 
				        name="name"  
				        id="name"
				        required/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        onChange={onEmailChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        required/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password"
				        minLength="6"
				        required
				        onChange={onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      onClick={onRegisterSubmit} 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Register"/>
				    </div>
				    <div className="lh-copy mt3">
				      <label className="db fw6 lh-copy f6">Already a user?</label>
				      <p onClick={()=>onRouteChange('signin')} className="f6 link dim black db pointer">Sign in</p>
				    </div>
				    {
				    	this.state.error==="incorrect data"
				      	?<label className="db fw6 lh-copy f6 red">*Enter All Fields</label>
				    
				      	:(
				      		this.state.error==="Unable to register"
				      		?<label className="db fw6 lh-copy f6 red">*Email Already Registered</label>
				      		:<label></label>
				      	)
				    }
				  </div>
				</main>
			</article>
		)
	}
}
export default Register;
import React from 'react';

class SignIn extends React.Component {
	constructor(props){
		super(props)
		this.state={
			signInEmail:'',
			signInPassword:'',
			error:''
		}
	}

	onEmailChange=(event)=>{
		this.setState({signInEmail:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({signInPassword:event.target.value})
	}
	onSignInSubmit=()=>{
		fetch("http://localhost:3000/signin",{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
					email:this.state.signInEmail,
					password:this.state.signInPassword
				})
			
		})
		.then(response=>response.json())
		.then(user=>{
			if(user.id){
				this.props.loadUser(user)
				this.props.onRouteChange('home')
			}else{
				this.setState({error:user})}
			}
		)
		.catch(console.log)
	}
	render(){
		const {onRouteChange}=this.props
		const {onEmailChange,onPasswordChange,onSignInSubmit}=this
		return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address"
			        onChange={onEmailChange}/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        onChange={onPasswordChange}
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password"/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={onSignInSubmit} 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in"/>
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
			    </div>
			    {
			    	this.state.error==="incorrect data"
			      	?<label className="db fw6 lh-copy f6 red">*Enter All Fields</label>
			    
			      	:(
			      		this.state.error==="wrong credentials"
			      		?<label className="db fw6 lh-copy f6 red">*Incorrect Email or Password</label>
			      		:<label></label>
			      	)
				}
			  </div>
			</main>
		</article>
	)
	}
	
}
export default SignIn;
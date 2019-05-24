import React from 'react';

const formErrors={
	emailError:'',
	passwordError:''
}
const initialState = {
	signInEmail:'',
	signInPassword:'',
	error:'',
	formErrors
}
class SignIn extends React.Component {
	constructor(props){
		super(props)
		this.state=initialState
	}

	onEmailChange=(event)=>{
		this.setState({signInEmail:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({signInPassword:event.target.value})
	}
	validate=()=>{
		let emailError='';
		let passwordError='';
		if (!this.state.signInEmail.includes('@')){
			emailError='*Invalid Email';
		}
		if (!this.state.signInEmail.includes('.')){
			emailError='*Invalid Email';
		}
		if(!this.state.signInEmail){
			emailError='*Email Required';
		}
		if(this.state.signInPassword.length<6){
			passwordError='*Password must be of 6 digits';
			if(!this.state.signInPassword){
				passwordError='*Password Required';
			}
		}
		if(emailError || passwordError){
			this.setState({emailError,passwordError})
			return false
		}
		return true
	}
	onSignInSubmit=()=>{
		const isValid = this.validate();
		if(isValid){
			fetch("https://secret-mountain-68931.herokuapp.com/signin",{
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
						this.setState({error:user})
					}
				}
			)
			.catch(console.log)
			this.setState(formErrors)
		}
	}
	render(){
		const {onRouteChange}=this.props
		const {onEmailChange,onPasswordChange,onSignInSubmit}=this
		const {emailError,passwordError} = this.state
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
			        <div className="db fw6 lh-copy f6 red">{emailError}</div>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        onChange={onPasswordChange}
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password"/>
			        <div className="db fw6 lh-copy f6 red">{passwordError}</div>
			      </div>
			    </fieldset>
			    <div className = "center">
				    <div className="pr4 mt3">
				      <input 
				      onClick={onSignInSubmit} 
				      className="b ph3 pv2 shadow-3 input-reset link ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Sign in"/>
				    </div>
				    <div className="">
				      <p onClick={()=>onRouteChange('register')} className="b ph3 pv2 dim shadow-3 ba b--black bg-transparent grow pointer f6 dib">Register</p>
				    </div>
			    </div>
			    {//Server Form Validation
		      		this.state.error==="wrong credentials"
		      		?<label className="db fw6 lh-copy f6 red">*Incorrect Email or Password</label>
		      		:null
				}
			  </div>
			</main>
		</article>
	)
	}
	
}
export default SignIn;
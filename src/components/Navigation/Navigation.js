import React from 'react';
import'./Navigation.css'
const Navigation = ({onRouteChange,isSignedIn})=> {
	if(isSignedIn===true){
		return (
		<nav style={{display:'flex', justifyContent:'space-between'}}>
			<div style={{display:'flex', justifyContent:'space-between'}}>
			<p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('about')}>About</p>
			<p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('home')}>Home</p>
			</div>
			<div className="mainTitle">
				<p>Smart Brain</p>
			</div>
			<p onClick={()=>onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
		</nav>

	)
	}else{
		return (
		<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
			<p onClick={()=>onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
		</nav>
		)
	}
	
}
export default Navigation;
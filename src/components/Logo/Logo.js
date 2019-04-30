import Tilt from 'react-tilt'
import React from 'react';
import Brain from './brain.png'
import './Logo.css'

const Logo = ()=> {
	return (
		<div className="ma3 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 65 }} style={{ height: 120, width: 120 }} >
				<div className="Tilt-inner pa3"> <img src={Brain} alt="logo" style={{paddingTop:'5px'}}/> </div>
			</Tilt>
		</div>
	)
}
export default Logo;
import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit})=> {
	return (
		<div>
			<p className='f3'>
			This Magic Brain will detect faces in your picture. Give it a try!
		 	</p>
		 	<div className="center">
		 		<div className="form center pa4 br3 shadow-5">
		 			<input type='text' placeholder="Enter image url here!!!" className='center pa2 f4 w-70 ' onChange={onInputChange}/>
		 			<button className="w-30 grow link f4 bg-light-purple white dib ph3 pv2 pointer"
		 			onClick={onButtonSubmit}>Detect</button>
		 		</div>
		 	</div>

		</div>
	)
}
export default ImageLinkForm;
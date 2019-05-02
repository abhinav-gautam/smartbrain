import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl,box,isFaceDetected})=> {
	return (
	<div className="center ma">
		<div className="absolute mt3">
			<div>
				<img id='inputImage' alt="" src={imageUrl} style={{width:'500px',height:'auto'}}/>
				<div className="bounding-box" style={{top:box.topRow, bottom:box.bottomRow, left:box.leftCol, right:box.rightCol}}></div>
			</div>
			{
			isFaceDetected===false
				?<p className="db fw6 lh-copy f6 red">*Bad Image or Image URL</p>
				:<p></p>
			}
		</div>
	</div>
	)
}
export default FaceRecognition;
import React,{Component} from 'react';

import './ImageLinkForm.css'

class ImageLinkForm extends Component{	

	render(){
		const {onInputChange, onButtonSubmit, imageFileHandler, imageUploadHandler, progress, isUploading, fileName} = this.props
		return (
			<div>
				<p className='f3'>
				This Magic Brain will detect faces in your picture. Give it a try!
				</p>
				<div className="center ">
					<div className="form center pa4 br3 shadow-5 flex-column items-center">
						<input type='text' placeholder="Enter image url here or Choose image!!!" className='center pa2 f4 w-80 ' onChange={onInputChange}/>
						<input type="file" name="file" id="file" className="inputfile" onChange={imageFileHandler}/>
						<div className='center pa2 f4 w-100 '>
							<label htmlFor="file" className="w-30 grow link f4 bg-light-purple white dib ph3 pv2 pointer ba b--white ">
								{
									fileName
									?fileName
									:'Choose a file'
								}
							</label>
							<button className=" ba b--white w-30 grow link f4 bg-light-purple white dib ph3 pv2 pointer"
							onClick={imageUploadHandler}>Upload</button>
						</div>
						{
							isUploading
							?<p className="db f4 fw6 lh-copy blue ">Uploading...<progress value={progress} max='100'/></p>
							:null
						}
						<button className="w-30 grow link f4 bg-light-purple white dib ph3 pv2 pointer ba b--white"
						onClick={onButtonSubmit}>Detect</button>
					</div>
				</div>
			</div>
		)
	}
}
export default ImageLinkForm;
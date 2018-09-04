import React from 'react';

import './ImageLinkForm.css'

const imageLinkForm = (props) => {
	return (
		<div className=''>
			<p className="f3">
				{'This Magic Brain will detect faces in your pictures'}
			</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5'>
					<input onChange={props.onInputChange} className='f4 pa2 w-70 center' type='text'/>
					<button onClick={props.onSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default imageLinkForm;
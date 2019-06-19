import React from 'react';

const About =()=>{
    return(
        <div className="flex flex-column">
            <p className="f2 left ph3 underline red">About Smart Brain</p>
            <p className="f3">Smart Brain is a face detection web application that detect faces in the image.</p>
            <p className="f2 left ph3 underline red">How to use?</p>
            <p className="f3">You can give a link for an image or choose a image from your local hard drive.</p>
            <p className="f3">A direct link to an image must be given!!!</p>
            <p className="f2 left ph3 underline red">About the Developer</p>
            <p className="f3">Developed by Abhinav Gautam</p>
            <a href="https://github.com/ryan-rayark/smartbrain">Github Link</a>
        </div>
        

    )
}
export default About;

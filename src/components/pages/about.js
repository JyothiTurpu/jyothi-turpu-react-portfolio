import React from 'react';
import profilePicture from '../../../static/assets/images/bio/headshot.jpg';

export default function About() {
  return (
    <div className='content-page-wrapper'>
        <div className="left-column"
          style={{
            background: 'url(' + profilePicture + ') no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
        </div>
        <div className="right-column">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis adipisci ratione ducimus rerum, magni quis blanditiis accusantium. Nam explicabo sint iure, debitis voluptate ab architecto? Quas inventore placeat fugiat perspiciatis.
        </div>
    </div>
  )
}

// landing page

import React from 'react';
import {Link} from 'react-router-dom';

function AboutPage() {
  return (
    <div>
      <header className="landing">
          <h1>Welcome to Care For Paws</h1>
          <Link to="/" className="button">Learn More</Link>
      </header>
      <main>
          <div className="section1">
              <p> 
                  Every dog breed has needs and attributes that make them different from one another. It is important for owners to know about
                  the dog they want to get in order to best care for them!
              </p>
          </div>
      </main>
    </div>
  );
}

export default AboutPage;

export {AboutPage};
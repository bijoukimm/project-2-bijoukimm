import React from 'react';

function AboutPage() {
  return (
    <div>
        <div class="background-img">
              <div class="inner">
                  <div class="text-container text-center">
                    <h2 className="about-page-title">About Care For Paws</h2>
                  </div>
              </div>
          </div>
        <div className="about-content">
          <p> 
            Every dog breed has needs and attributes that make them different from one another. It is important for owners to know about
            the dog they want to get in order to best care for them!
          </p>
          <blockquote>Our goal is to give the necessary information about dogs to current or future dog owners 
            to give your new friend the best life possible. A pet is not an accessory nor simply a cute companion;
            they should be treated as a priority and receive careful attention.
          </blockquote>
          <p>We hope that our website takes a step closer to ending pet abuse and animal cruelty. 
            Feel free to contact us at the email address at the bottom of the page!</p>
        </div>
    </div>
  );
}
export default AboutPage;
export {AboutPage};


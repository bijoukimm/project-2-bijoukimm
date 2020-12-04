import React from 'react';
import { UncontrolledCarousel, Button } from 'reactstrap';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import DOGS from './dogs.csv';

function BreedPage(props) {
  let breedName = '';
  const urlParams = useParams();
  breedName = urlParams.breedName;

  //pretend we loaded external data    
  // let dog =  _.find(SAMPLE_DOGS, {breed: breedName}); //find pet in data
  let dog = DOGS;

  if(!dog) return <h2>No dog specified</h2> //if unspecified

  //NEED TO MODIFY THIS
  let carouselItems = dog.images.map(function(img){
    let obj = { src: '../'+img, altText: dog.Breed, caption: '' };
    return obj;
  })

  return (
    <div>
      <h2>{dog.Breed}</h2>
      {/* <p className="lead">{pet.breed}</p> */}
      <UncontrolledCarousel
        items={carouselItems} 
        indicators={false}
        controls={true}
        />
      {/* <Button disabled size="large" color="primary">Adopt me now!</Button> */}
    </div>
  );
}

export default BreedPage;
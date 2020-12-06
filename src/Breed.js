import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

function BreedPage(props) {
  let breedName = '';
  const urlParams = useParams();
  breedName = urlParams.breedName;

  //pretend we loaded external data    
  // let dog =  _.find(SAMPLE_DOGS, {breed: breedName}); //find pet in data
  let allDogs = props.pets;

  let dog =  _.find(allDogs, {BreedName: breedName}); //find pet in data
  if(!dog) return <h2>No dog specified</h2> //if unspecified


// // get dog picture 
//   let dogImage = () => {
//     let image = { src: '../' + dog.images, altText: dog.BreedName, caption: ''}
//     return image;
//   }
  
let colourList = dog.FurColors.map(function(color) {
  return (<li>{color}</li> );
}); 

  return (
    <div>
      <div class="husky-head">
          <img className="dog-img-top" src={dog.images} alt={dog.BreedName} />
          <h1 class="headname">{dog.BreedName}</h1>
      </div>
      <main>
          <div class="breed-content">
              <section class="about"></section>
              <div class="information">
                  <div class="husky-info-container">
                      <div class="column husky-cards husky-info-container1">
                          <h3>Personality</h3>
                          <p class="personality-br">{dog.Personality}</p>
                      </div>
                      <div class="column husky-cards husky-info-container2">
                          <h3>Fur Colors</h3>
                          <p class="furinfo-br">{"The " + dog.BreedName + " has a fur coat that usually are:"}</p>
                          <ul class="colors-br">
                            {colourList}
                          </ul>
                      </div>
                      <div class="column husky-cards husky-info-container3">
                          <h3>Size</h3>
                          <ul class="size-br">{dog.Size}</ul> 
                      </div>
                  </div>
              </div>
          </div>
      </main>
    </div>
  );
}

export default BreedPage;

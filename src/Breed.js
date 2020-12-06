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
      <div className="husky-head">
          <img className="dog-img-top" src={"../" + dog.images} alt={dog.BreedName} />
          <h1 className="headname">{dog.BreedName}</h1>
      </div>
      <main>
          <div className="breed-content">
              <section className="about"></section>
              <div className="information">
                  <div className="husky-info-container">
                      <div className="column husky-cards husky-info-container1">
                          <h3>Personality</h3>
                          <p className="personality-br">{dog.Personality}</p>
                      </div>
                      <div className="column husky-cards husky-info-container2">
                          <h3>Fur Colors</h3>
                          <p className="furinfo-br">{"The " + dog.BreedName + " has a fur coat that usually are:"}</p>
                          <ul className="colors-br">
                            {colourList}
                          </ul>
                      </div>
                      <div className="column husky-cards husky-info-container3">
                          <h3>Size</h3>
                          <ul className="size-br">{dog.Size}</ul> 
                      </div>
                  </div>
              </div>
          </div>
      </main>
    </div>
  );
}

export default BreedPage;

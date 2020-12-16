import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import './App.css';
import firebase from 'firebase/app';
import { useState } from 'react';

function BreedPage (props) {
  let breedName = '';
  const urlParams = useParams();
  breedName = urlParams.breedName;
  let contains = props.location.isAdded;
  const [favStatus, setFavStatus] = useState(props.location.fav);

  let allDogs = props.pets;

  let dog =  _.find(allDogs, {BreedName: breedName});
  if(!dog) return <h2>No dog specified</h2>

  const toggleBreed = (event) => {
    event.preventDefault();
    if (contains === true) {
      removeBreed();
      contains = false;
      setFavStatus("Add to Favorites");
    } else {
      addBreed();
      contains = true;
      setFavStatus("Remove from Favorites");
    }
  }

  const addBreed = () => {
    const newBreedObj = {
      breed: dog.BreedName,
      userId: props.user.uid,
      userName: props.user.displayName
    }

    const breedsRef = firebase.database().ref('breeds');
    breedsRef.push(newBreedObj);
  }
  
  const removeBreed = () => {
      const breedsRef = firebase.database().ref('breeds');
      breedsRef.on('value', (snapshot) => {
        const theBreedsObj = snapshot.val(); //convert it into a JS value
        if (theBreedsObj != null) {
        let objectKeyArray = Object.keys(theBreedsObj);
        objectKeyArray.map((key) => {
          let breedObj = theBreedsObj[key];
          breedObj.key = key;
          if (breedObj.breed === dog.BreedName && breedObj.userId === props.user.uid) {
            firebase.database().ref('breeds/' + key).update({ breed: "" });
            firebase.database().ref('breeds/' + key).update({ userId: "" });
            firebase.database().ref('breeds/' + key).update({ userName: "" })
          }
          return breedObj;
        })
      }
    });
  }
  
  let colourList = dog.FurColors.map(function(color) {
    return (<li key={color}>{color}</li> );
  }); 

  return (
    <div>
      <div className="husky-head">
          <img className="dog-img-top" src={"../" + dog.images} alt={dog.BreedName} />
          <h2 className="headname">{dog.BreedName}</h2>
        
      </div>
      <main>
        
          <div className="breed-content">
              <section className="about"></section>
              <div className="information">
                  <div className="husky-info-container">
                
                      <div className="column husky-cards husky-info-container1">
                      <button className="favButton" key={dog.BreedName} onClick={toggleBreed}>{favStatus}</button>
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
                          <p className="size-br">{dog.Size}</p> 
                      </div>
                      <div className="column husky-cards husky-info-container4">
                          <h3>About</h3>
                          <p className="size-br">{dog.About}</p> 
                      </div>
                  </div>
              </div>
          </div>
      </main>
    </div>
  )
}

export default BreedPage;

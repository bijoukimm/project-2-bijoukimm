import React from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import './App.css'; //import css file!
import firebase from 'firebase';
import { useState } from 'react';

function BreedPage (props) {
  let breedName = '';
  const urlParams = useParams();
  breedName = urlParams.breedName;
  let contains = false;
  //let favStatus = "Add to Favorites";
  const [favStatus, setFavStatus] = useState("Add to Favorites");

  //pretend we loaded external data    
  // let dog =  _.find(SAMPLE_DOGS, {breed: breedName}); //find pet in data
  let allDogs = props.pets;

  let dog =  _.find(allDogs, {BreedName: breedName}); //find pet in data
  if(!dog) return <h2>No dog specified</h2> //if unspecified


  const toggleBreed = (event) => {
    event.preventDefault();
    if (contains === true) {
      removeBreed();
      //setContains(false);
      contains = false;
      setFavStatus("Add to Favorites");
      //favStatus = "Add to Favorites";
    } else {
      addBreed();
      contains = true;
      //setContains(true);
      setFavStatus("Remove to Favorites");
      //favStatus = "Remove from Favorites";
    }
  }
  //post a new chirp to the database
  const addBreed = () => {
    console.log("Posting " + dog.BreedName);

    const newBreedObj = {
      breed: dog.BreedName,
      userId: props.user.uid,
      userName: props.user.displayName
    }

    const breedsRef = firebase.database().ref('breeds');
    breedsRef.push(newBreedObj);
  }
  
  const removeBreed = () => {
    console.log("Removing " + dog.BreedName);
      const breedsRef = firebase.database().ref('breeds');
      breedsRef.on('value', (snapshot) => {
        const theBreedsObj = snapshot.val(); //convert it into a JS value
        let objectKeyArray = Object.keys(theBreedsObj);
        //console.log(JSON.stringify(objectKeyArray));
        objectKeyArray.map((key) => {
          //console.log(JSON.stringify(key));
            let breedObj = theBreedsObj[key];
            breedObj.key = key;
            if (breedObj.breed === dog.BreedName && breedObj.userId === props.user.uid) {
              firebase.database().ref('breeds/' + key).update({ breed: "" });
              firebase.database().ref('breeds/' + key).update({ userId: "" });
              firebase.database().ref('breeds/' + key).update({ userName: "" });
            }
        })
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

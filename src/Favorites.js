import React from 'react';
// import ReactDOM from 'react-dom';
import { useState, useEffect} from 'react';
import firebase from 'firebase/app';
// import BreedPage from './Breed';
import { Redirect} from 'react-router';  //route, switch
// import DOGS from './Breeds.json';
import { FaStar } from 'react-icons/fa';

function FavoritesPage(props) {
  const pets = props.dogs;
  console.log("user: " + props.user.displayName)

  return (
    <div>
      <div className="something">
          <div className="text-container text-center">
              <h2 className="fave-page-title">My Favorites</h2>
          </div>
      </div>
      <div className="favorites">
        <FavDogList pets={pets} user={props.user}/>
      </div>
    </div>
  );
}

function FavDogList(props) {
  let dogs = props.pets; //handle if not provided a prop

  // access data from firebase and return selected dogs only
  const [breeds, setBreeds] = useState([]) //an array!

  useEffect(() => {
    const breedsRef = firebase.database().ref('breeds');
    breedsRef.on('value', (snapshot) => {
      const theBreedsObj = snapshot.val(); //conver it into a JS value
      let objectKeyArray = Object.keys(theBreedsObj);
      let breedsArray = objectKeyArray.map((key) => {
          let breedObj = theBreedsObj[key];
          breedObj.key = key;
          return breedObj;
      })

      setBreeds(breedsArray);
    });
  }, [])

  if (breeds.length === 0) return null; //if no breeds, don't display

  let dogCards = dogs.map((dog) => {
    for (let i = 0; i < breeds.length; i++) {
      if (dog.BreedName === breeds[i].breed && props.user.uid === breeds[i].userId) {
          return (
          <FavDogCard key={dog.BreedName} dog={dog} />
          )
      } 
    }
  })

  return (
    <div>
        <div className="flex-container">
          <div className="card-deck">
              {dogCards}
        </div>
      </div>
    </div>
  );
}
  
  function FavDogCard(props) {
    // console.log(props.dog);
    const [redirectTo, setRedirectTo] = useState(undefined);
    const handleClick = () => {
      console.log("You clicked on", props.dog.BreedName);
      setRedirectTo(props.dog.BreedName);
    }
  
    const postBreed = (event) => {
      event.preventDefault(); //don't submit
      console.log(dog.BreedName);
    }

    // const toggleBreed = () = > {

    // }

    if (redirectTo !== undefined) {
      return <Redirect push to={"/breed/" + redirectTo} />
    }
  
    let dog = props.dog; //shortcut

    return (
      <div className="card clickable" onClick={handleClick}>
        <button className="faveStarpage" key={dog.BreedName} onClick={postBreed}><FaStar/></button>
        <img className="card-img-top" src={dog.images} alt={dog.BreedName} />
        <div className="card-body">
          <p className="card-title">{dog.BreedName} </p>
        </div>
      </div>
    );
  }

  export default FavoritesPage;
  export {FavoritesPage};
import React from 'react';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router';  //route, switch


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
    if (theBreedsObj != null) {
      let objectKeyArray = Object.keys(theBreedsObj);
      let breedsArray = objectKeyArray.map((key) => {
          let breedObj = theBreedsObj[key];
          breedObj.key = key;
          return breedObj;
      })

      setBreeds(breedsArray);
    }
    });
  }, [])

  let specificLength = 0;
  breeds.map((breed) => {
    if (breed.userId === props.user.uid) {
      specificLength++;
    }
  })

  let count = 0;
  breeds.map((breed) => {
    if (breed.userId === props.user.uid && breed.breed === "") {
      count++;
    }
    return count;
  })

  if (breeds.length === 0 || count === specificLength)  //if no breeds, don't display
    return (
      <div className="nofavorites">
        <p>No favorites yet!</p>
      </div>
    )  //how do we add classname here lol oh im dumb

  let dogCards = dogs.map((dog) => {
    let favDogCard;
    for (let i = 0; i < breeds.length; i++) {
      if (dog.BreedName === breeds[i].breed && props.user.uid === breeds[i].userId) {
        favDogCard = <FavDogCard key={dog.BreedName} dog={dog}/>
      } 
    }
    return favDogCard;
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

    if (redirectTo !== undefined) {
      return <Redirect push to={{pathname: "/breed/" + redirectTo, isAdded: true, fav: "Remove from Favorites"}}/>
    }
  
    let dog = props.dog; //shortcut

    return (
      //<Link to={{pathname: "/breed/" + props.dog.BreedName, isAdded: true, fav: "Remove from Favorites"}}>
      
      <div className="card clickable" onClick={handleClick}>
        <img className="card-img-top" src={dog.images} alt={dog.BreedName} />
        <div className="card-body">
          <p className="card-title">{dog.BreedName} </p>
        </div>
      </div>
      //</Link>
    );
  }


  export default FavoritesPage;
  export {FavoritesPage};
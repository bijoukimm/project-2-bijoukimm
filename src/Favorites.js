import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect} from 'react';
import firebase from 'firebase/app';
import BreedPage from './Breed';
import { Route, Switch, Redirect} from 'react-router'; 
import DOGS from './Breeds.json';

function FavoritesPagedfa() {
    return(
        <div>
            <h1>PRINT</h1>
            </div>        
    )
}

function FavoritesPage() {
    const pets = DOGS;
    //console.log("pets: " + pets);
    const renderDogList = (routerProps) => {
        return <DogList {...routerProps} pets={pets} />
      }

    return (
      <div>
        <div className="something">
            <div className="text-container text-center">
                <h2 className="fave-page-title">My Favorites</h2>
            </div>
        </div>
        <div className="favorites">
            <Switch>
                <Route path="/favorites" render={renderDogList}/>
            </Switch>
        </div>
      </div>
    );
  }

  function DogList(props) {
    let dogs = props.pets; //handle if not provided a prop
    //console.log("dogs: " + dogs);
  
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

        breeds.map((breed) => {
            breed.map((idk) => {
                console.log("breeds: " + idk);
            })
            
        })
      });
    }, [])
    //console.log("dogs: " + dogs);
  
    //if (breeds.length == 0) return null; //if no chirps, don't display

    let dogCards = dogs.map((dog) => {
        breeds.map((breed) => {
            if (dog.BreedName == breeds) {
                return <DogCard key={dog.BreedName} dog={dog} />;
            } 
        })
    })

    // let dogCards = breeds.map((breedObj) => {
    //     return <DogCard key={breedObj.key} dog={breedObj.BreedName}  />
    //   })

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
  
  function DogCard(props) {
    const [redirectTo, setRedirectTo] = useState(undefined);
    const handleClick = () => {
      console.log("You clicked on", props.dog.BreedName);
      setRedirectTo(props.dog.BreedName);
    }
  
    if (redirectTo !== undefined) {
      return <Redirect push to={"/breed/" + redirectTo} />
    }
  
    let dog = props.dog; //shortcut
    return (
      <div className="card clickable" onClick={handleClick}>
        <img className="card-img-top" src={dog.images} alt={dog.BreedName} />
        <div className="card-body">
          <p className="card-title">{dog.BreedName} </p>
        </div>
      </div>
    );
  }

  export default FavoritesPage;
  export {FavoritesPage};
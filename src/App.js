import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Select from 'react-select'
import { AboutPage } from './About';
import BreedPage from './Breed';
import FavoritesPage from './Favorites';
import './App.css'; 
import LOGO from './doggy.png';
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const SIZES = [
  {label: "Very small", value: "Very small"}, 
  {label: "Small", value: "Small"}, 
  {label: "Medium", value: "Medium"}, 
  {label: "Large", value: "Large"}, 
  {label: "Very large", value: "Very large"}
];
const COLOURS = [ 
  {label: "Black", value: "Black"}, 
  {label: "White", value: "White"}, 
  {label: "Red", value: "Red"}, 
  {label: "Grey", value: "Grey"}, 
  {label: "Tan", value: "Tan"},
  {label: "Chocolate", value: "Chocolate"},
  {label: "Orange", value: "Orange"},
  {label: "Brown", value: "Brown"},
  {label: "Cream", value: "Cream"},
  {label: "Fawn", value: "Fawn"},
  {label: "Golden", value: "Golden"},
  {label: "Dark Golden", value: "Dark Golden"},
  {label: "Mahogany", value: "Mahogany"},
  {label: "Sable", value: "Sable"},
];

const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  credentialHelper: 'none',
  signInFlow: 'popup',
  callbacks: {
    //avoid redirects after sign-in
    signInSuccessWithAuthResult: () => false,
  },
};

function App(props) {
  const pets = props.dogs;

  const renderDogList = (routerProps) => {
    return <DogList {...routerProps} pets={pets} user={user} />
  }
  const renderBreedPage = (routerProps) => {
    return <BreedPage {...routerProps} pets={pets} user={user}/>
  }
  const [errorMessage, setErrorMessage] = useState(undefined);
  const[user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  //auth state event listener
  useEffect(() => {
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log("logged in as " + firebaseUser.displayName);
        setIsLoading(false);
        setUser(firebaseUser);
      } else {
        console.log("logged out");
        setUser(null);
        setIsLoading(false);
      }
    })

    return function cleanup() {
      authUnregisterFunction();
    }
  }, [])

  const handleSignOut = () => {
    setErrorMessage(null);
    firebase.auth().signOut();
  }

  //spinner
  if (isLoading) {
    return (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>
    )
  }
  
  let content = null;

  if (!user) {
    content = (
      <div className="signup-page">
        <img src={LOGO} alt="dog logo" className="logoSign"/>
        <header className="signupheader"> </header>
        <h1 className="signup-title">Sign Up</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  } else {
    content = (
        <div className="main">
      <header className="py-4">
        <div className="container col">
          <h1 className="title"><Link to='/'><img src={LOGO} alt="dog logo" className="logo"/> Care for Paws </Link></h1>
        </div>
        <div className="logout-button"> 
        {user &&
            <button className="btn" onClick={handleSignOut}>
              Log Out {user.displayName}
            </button>} 
        </div>
        <div>
          <NavBar user={user} handleSignOut={handleSignOut}/>      
        </div>
      </header>
     
      <main className="container main-page"> 
        <div>
          {errorMessage &&
            <p className="alert alert-danger">{errorMessage}</p>
          }
          {content}
        </div>
        <div className="row">
          <div className="row">
            <Switch>
              <Route exact path="/" render={renderDogList}/>
              <Route path="/about" component={AboutPage}/>
              <Route path="/favorites" render={(props) => (<FavoritesPage {...props} dogs={pets} user={user} />)} />
              <Route path="/breed/:breedName" render={renderBreedPage}/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </div>
      </main>

      <footer className="container">
        <small>Contact Us: careforpaws@uw.edu</small>
      </footer>
    </div>
    )
  }

  return (
    <div>
      {errorMessage &&
        <p className="alert alert-danger">{errorMessage}</p>
      }
      {content}
    </div>
  )}

function NavBar(props) {
  return (
    <div className="nav-container">
      <ul id="nav">
        <li><NavLink exact to="/" activeClassName={"activeLink"}>Home</NavLink></li>
        <li><NavLink to="/about" activeClassName={"activeLink"}>About Us</NavLink></li>
        <li><NavLink to="/favorites" activeClassName={"activeLink"}>Favorites</NavLink></li>
      </ul>
    </div>
  );
}

function DogList(props) {
  let dogs = props.pets;
  let dogCards = dogs.map((dog) => {
    return <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
  })

  const [sizes, setSizes] = useState(undefined);
  const [colours, setColours] = useState(undefined);
  let handleSize = (size) => {
    if (size == null ) { 
      setSizes(undefined);
    } else if (size.length === 0) {
      setSizes(undefined);
    }
    else {
      setSizes(size);
    }
  }

  if (sizes !== undefined && sizes !== null) {
    dogCards = dogs.map((dog) => {
      let dogCard;
      for (let i = 0; i < sizes.length; i++) {
        if (dog.Size === sizes[i].value) {
          dogCard = <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
        }
      }
      return dogCard;
    })
  } else if (colours === undefined && sizes === undefined) {
    dogCards = dogs.map((dog) => {
      return <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
    })
  }

  let handleColour = (colour) => {
    if (colour == null) {
      setColours(colour);
    } else if (colour.length === 0) {
      setColours(undefined);
    } else {
      setColours(colour)
    }
  }

  if (colours !== undefined && colours !== null) {
    dogCards = dogs.map((dog) => {
      let dogCard;
      for (let i = 0; i < colours.length; i++) {
        for (let j = 0; j < dog.FurColors.length; j++) {
          if (dog.FurColors[j] === colours[i].value) {
            dogCard = <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
          }
        }
      }
      return dogCard;
    })
  } else if (colours === undefined && sizes === undefined) {
      dogCards = dogs.map((dog) => {
      return <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
    })
  }

  return (
    <div className="filterandcards">
      <div className="filter-container">
        <div className="row">
          <div className="col-md-3"></div>
            <div className="col-md-3 filter">
              Sizes: <Select options={SIZES} isMulti
              onChange={handleSize}
              values={sizes} />
            </div>
            <div className="col-md-3 filter">
              Fur Colours: <Select options={COLOURS} isMulti
              onChange={handleColour}
              values={colours} />
            </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      <div className="main-dog-cards">
        <h2 className="cards-list-title">Dog Breeds</h2>
        <div className="flex-container">
          <div className="card-deck">
            {dogCards}
          </div>
        </div>
      </div>
    </div>
  );
}

function DogCard(props) {
  let dog = props.dog;

  const [redirectTo, setRedirectTo] = useState(undefined);
  const handleClick = () => {
    setRedirectTo(props.dog.BreedName);
  }

  if (redirectTo !== undefined) {
    return <Redirect push to={{pathname: "/breed/" + redirectTo, isAdded: false, fav: "Add to Favorites"}} />
  }

  return (
    <div className="card clickable" onClick={handleClick}>
      <img className="card-img-top" src={dog.images} alt={dog.BreedName}/>
      <div className="card-body">
        <p className="card-title">{dog.BreedName} </p>
      </div>
    </div>
  );
}

export default App;


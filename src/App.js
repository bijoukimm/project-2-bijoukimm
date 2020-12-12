import React, { useState, useEffect } from 'react'; //import React Component
import { Route, Switch, Redirect } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Select from 'react-select'
import { AboutPage } from './About';
import BreedPage from './Breed';
import FavoritesPage from './Favorites';
import './App.css'; //import css file!
import LOGO from './doggy.png';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {BsStar} from 'react-icons/bs';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
  const pets = props.dogs; //pretend this was loaded externally or via prop
  const renderDogList = (routerProps) => {
    return <DogList {...routerProps} pets={pets} user={user} />
  }
  const renderBreedPage = (routerProps) => {
    return <BreedPage {...routerProps} pets={pets} />
  }
  const [errorMessage, setErrorMessage] = useState(undefined);
  const[user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  //auth state event listener
  useEffect(() => { //run after conponent loads
    //listen for changes to the authstate (logged in or not)
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log("logged in as " + firebaseUser.displayName);
        // console.log(firebaseUser);
        setIsLoading(false);
        setUser(firebaseUser);
      } else {
        console.log("logged out");
        setUser(null);
        setIsLoading(false);
      }
    })

    return function cleanup() { // what to do when done loading
      authUnregisterFunction();
    }
  }, [])

  const handleSignOut = () => {
    setErrorMessage(null); //clear any old errors
    firebase.auth().signOut();
  }
  
  //firebase authenticator
  // let theAuthenticator = firebase.auth();

  //spinner
  if (isLoading) {
    return (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>
    )
  }
  
  let content = null; //content to render

  if (!user) {
    content = (
      <div className="container">
        <h1> Sign Up</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  } else {
    content = (
        <div>
      <header className="py-4">
        <div className="container col">
          <h1 className="title"><Link to='/'><img src={LOGO} alt="dog logo" className="logo"/> Care for Paws </Link></h1>
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
              <Route path="/favorites" component={FavoritesPage} dogs={props.dogs}/>
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
        <li>
        {props.user &&
            <button className="btn btn-warning" onClick={props.handleSignOut}>
              Log Out {props.user.displayName}
            </button>} 
        </li>
      </ul>
    </div>
  );
}

function DogList(props) {
  let dogs = props.pets; //handle if not provided a prop
  let dogCards = dogs.map((dog) => {
    return <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
  })

  const [sizes, setSizes] = useState(undefined);
  let handleSize = (sizes) => {
    setSizes(sizes);
  }

  if (sizes !== undefined && sizes !== null) {
    dogCards = dogs.map((dog) => {
      for (let i = 0; i < sizes.length; i++) {
        if (dog.Size == sizes[i].value) {
          return <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
        }
      }
    })
  } else {
    dogCards = dogs.map((dog) => {
      return <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
    })
  }

  const [colours, setColours] = useState(undefined);

  let handleColour = (colours) => {
    setColours(colours);
  }

  if (colours !== undefined && colours !== null) {
    dogCards = dogs.map((dog) => {
      for (let i = 0; i < colours.length; i++) {
        for (let j = 0; j < dog.FurColors.length; j++) {
          if (dog.FurColors[j] == colours[i].value) {
            return <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
          }
        }
      }
    })
  } else {
      console.log("blah");
      dogCards = dogs.map((dog) => {
      return <DogCard key={dog.BreedName} dog={dog} user={props.user} />;
    })
  }

  return (
    <div>
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
              values={colours}/>
            </div>
          <div className="col-md-4"></div>
        </div>
      </div>

      <div>
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
  let dog = props.dog; //shortcut

  const [redirectTo, setRedirectTo] = useState(undefined);
  const handleClick = () => {
    console.log("You clicked on", props.dog.BreedName);
    setRedirectTo(props.dog.BreedName);
  }

  //post a new chirp to the database
  const postBreed = (event) => {
    event.preventDefault(); //don't submit
    console.log(dog.BreedName);
    
    /* TODO: add a new Chirp to the database */
    // const newBreedObj = {
    //   breed: dog.BreedName
    // }

    const newBreedObj = {
      breed: dog.BreedName,
      userId: props.user.uid,
      userName: props.user.displayName
    }

    const breedsRef = firebase.database().ref('breeds');
    breedsRef.push(newBreedObj);
  }

  if (redirectTo !== undefined) {
    return <Redirect push to={"/breed/" + redirectTo} />
  }

  
  return (
    <div className="card clickable" onClick={handleClick}>
      <i className="star-icon" key={dog.BreedName} onClick={postBreed}><BsStar/></i>
      <img className="card-img-top" src={dog.images} alt={dog.BreedName} />
      <div className="card-body">
        <p className="card-title">{dog.BreedName} </p>
      </div>
    </div>
  );
}

export default App;

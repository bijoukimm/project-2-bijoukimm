import React, { useState } from 'react'; //import React Component
import {AboutPage} from './About';
import BreedPage from './Breed';
import './App.css'; //import css file!
import {Route, Switch, Redirect} from 'react-router';
import {Link, NavLink} from 'react-router-dom';

import SAMPLE_DOGS from './dogs.csv'; //a sample list of dogs (model)
import { render } from 'react-dom';

function App(props) {

  const pets = SAMPLE_DOGS; //pretend this was loaded externally or via prop
  const renderPetList = (routerProps) => {
    return <PetList {...routerProps} pets={pets} />
  }

  return (
    <div>
      <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
          <h1><Link to='/'>Care for Paws it's defiiately our project</Link></h1>
        </div>
      </header>
    
      <main className="container">
        <div className="row">
          <div className="col-3">
            <AboutNav />
          </div>
          <div className="col-9">
            <Switch>
              <Route exact path="/" render={PetList}/>
              <Route path="/about" component={AboutPage}/>
              <Route path="/breed/:breedName" component={BreedPage}/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </div>
      </main>

      <footer className="container">
        <small>Contact Us: example@uw.edu</small>
      </footer>
    </div>
  );
}

function AboutNav() {
  return (
    <nav id="aboutLinks">
      <h2>About</h2>
      <ul className="list-unstyled">
        <li><NavLink exact to="/" activeClassName={"activeLink"}>Adopt a Pet</NavLink></li>
        <li><NavLink to="/about" activeClassName={"activeLink"}>About Us</NavLink></li>
        <li><NavLink to="/resources" activeClassName={"activeLink"}>Resources</NavLink></li>
      </ul>
    </nav>
  );
}

function PetList(props) {
  let pets = props.pets || []; //handle if not provided a prop
  let petCards = pets.map((pet) => {
    return <PetCard key={pet.name} pet={pet} />;
  })

  return (
    <div>
      <h2>Dogs</h2>
      <div className="card-deck">
        {petCards}
      </div>
    </div>
  );
}

function PetCard(props) {
  const [redirectTo, setRedirectTo] = useState(undefined);
  const handleClick = () => {
    console.log("You clicked on", props.pet.name);
    setRedirectTo(props.pet.name);
  }

  if (redirectTo !== undefined) {
    return <Redirect push to={"/adopt/" + redirectTo} />
  }

  let pet = props.pet; //shortcut
  return (
    <div className="card clickable" onClick={handleClick}>
      <img className="card-img-top" src={pet.images[0]} alt={pet.name} />
      <div className="card-body">
        <h3 className="card-title">{pet.name} {pet.adopted ? '(Adopted)' : ''}</h3>
        <p className="card-text">{pet.sex} {pet.breed}</p>
      </div>
    </div>
  );
}

export default App;

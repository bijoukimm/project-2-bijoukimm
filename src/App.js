import React, { useState, Component } from 'react'; //import React Component
import { Route, Switch, Redirect } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { render } from 'react-dom';

import { AboutPage } from './About';
import { BreedPage } from './Breed';
import './App.css'; //import css file!
import LOGO from './doggy.png'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


function App(props) {

  const pets = props.dogs; //pretend this was loaded externally or via prop
  const renderPetList = (routerProps) => {
    return <PetList {...routerProps} pets={pets} />
  }

  return (
    <div>
      <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
          <h1 className="title"><Link to='/'><img src={LOGO} alt="dog logo" className="logo"/> Care for Paws</Link></h1>

        </div>
      </header>
    
      <main className="container">
        <div className="row">
          <div className="col-3">
            <AboutNav />
          </div>
          <div className="col-9">
            <Switch>
              <Route exact path="/" render={renderPetList}/>
              <Route path="/about" component={AboutPage}/>
              <Route path="/breed/:breedName" component={BreedPage}/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </div>
      </main>

      <footer className="container">
        <small>Contact Us: careforpaws@uw.edu</small>
      </footer>
    </div>
  );
}

function AboutNav() {
  return (
    <nav id="aboutLinks">
      <ul className="list-unstyled">
        <li><NavLink exact to="/" activeClassName={"activeLink"}>Breeds</NavLink></li>
        <li><NavLink to="/about" activeClassName={"activeLink"}>About Us</NavLink></li>
      </ul>
    </nav>

  );
}

function PetList(props) {
  let dogs = props.pets; //handle if not provided a prop
  let dogCards = dogs.map((dog) => {
    return <PetCard key={dog.BreedName} dog={dog} />;
  })

  return (
    <div>
      <h2>Dog Breeds</h2>
      <div className="card-deck">
        {dogCards}
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

export default App;

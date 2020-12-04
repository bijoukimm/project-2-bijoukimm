// change class names

import React, { useState } from 'react';
import {AboutPage} from './About';
import BreedPage from './Breed';
import './App.css';

import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import DOGS from './dogs.csv';

function App() {

  const dogs = DOGS;
  const renderDogList = (routerProps) => {
    return <DogList {...routerProps} dogs={dogs} />
  }

  return (
    <BrowserRouter>
      <div>
        <header className="index">
          <h1>
              <span className="heading-bar">
                <Link to='/'>Care for Paws</Link> {/*how do i insert an image*/}
                <Link to='/about' className='about-button' component={AboutPage}>About</Link> {/*route? link?*/}
              </span>
          </h1>
        </header>

        <div className="form-align">
          <Navbar/>
        </div>

        {/* <div className="husky-head">
          <a href="index.html" className="close-button" aria-label="close"><i className="fa fa-window-close" aria-hidden="true"></i></a>
          <BreedName/>
        </div> */}

        <main>
          {/* <div className="breed-content">
            <section className="about"></section>
            <div className="information">
              <BreedContent/>
            </div>
          </div> */}

          <div className="content">
            <div className="dog-cards-main">
              <Switch>
                <Route exact path="/" render={renderDogList}/>
                <Route path="/:breedName" component={BreedPage}/>
                <Redirect to="/"/>
              </Switch>
            </div>
          </div>
        </main>

        <footer>
            <p>Contact Us: careforpaws@email.com</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function Navbar() {
  function toggleDropDown(type) {
    if (type == 'breed') {
      document.getElementById("breedOptionContainer").classList.toggle("show");
    } else {
      document.getElementById("sizeOptionContainer").classList.toggle("show");
    }
  }
  return (
    <form className="f-inline">
      <div className="bundle">
          <h2>Breed:</h2>
          <div className="dropdown">
            {/*fix? toggleDropDown*/}
            <button type="button" onclick={toggleDropDown('breed')} className="dropbtn breed-dropbtn">Select breed...</button>
            <div id="breedOptionContainer" className="dropdown-content">
              <a className="remove-filter breed-option">Remove filter</a>
            </div>
          </div>               
      </div>
      <div className="bundle">
        <h2>Size:</h2>
        <div className="dropdown">
          {/*fix? toggleDropDown*/}
          <button type="button" onclick={toggleDropDown('size')} className="dropbtn size-dropbtn">Select size...</button>
          <div id="sizeOptionContainer" className="dropdown-content">
                  <a className="remove-filter size-option">Remove filter</a>
                  <a className="size-option">Very small</a>
                  <a className="size-option">Small</a>
                  <a className="size-option">Medium</a>
                  <a className="size-option">Large</a>
                  <a className="size-option">Very large</a>
          </div>
        </div>
      </div>
      <div className="bundle">
          <label for="color">Fur color:</label><br/>
          <input type="text" id="color" placeholder="ex: Black and White" name="color"/><br/> 
          <div id="colorFeedback" className="invalid-feedback"></div>
      </div>
      <div className="bundle"><button type="button" aria-label="submit" class="submit">Submit</button></div>
    </form>
  );
}

function DogList(props) {
  let dogs = props.dogs || []; //handle if not provided a prop
  let dogCards = dogs.map((dog) => {
    return <DogCard key={dog['Breed Name']} dog={dog} />;
  })

  return (
    <div>
      {dogCards}
    </div>
  );
}

function DogCard(props) {
  const [redirectTo, setRedirectTo] = useState(undefined);
  const handleClick = () => {
    console.log("You clicked on", props.dog.Name);
    setRedirectTo(props.dog.Name);
  }

  if (redirectTo !== undefined) {
    return <Redirect push to={"/breed/" + redirectTo} />
  }

  let dog = props.dog; //shortcut
  return (
    <div className="card clickable" onClick={handleClick}>
      <img className="card-img-top" src={dog.images[0]} alt={BreedPage} />
      <div className="card-body">
        <p className="card-text">{dog.breed}</p>
      </div>
    </div>
    
  );
}

export default App;

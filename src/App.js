import React, { useState } from 'react'; //import React Component
import { Route, Switch, Redirect } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Select from 'react-select'
import { AboutPage } from './About';
import BreedPage from './Breed';
import './App.css'; //import css file!
import LOGO from './doggy.png'
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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

function App(props) {

  const pets = props.dogs; //pretend this was loaded externally or via prop
  const renderDogList = (routerProps) => {
    return <DogList {...routerProps} pets={pets} />
  }
  const renderBreedPage = (routerProps) => {
    return <BreedPage {...routerProps} pets={pets} />
  }

  return (
    <div>
      <header className="py-4">
        <div className="container col">
          <h1 className="title"><Link to='/'><img src={LOGO} alt="dog logo" className="logo"/> Care for Paws </Link></h1>
        </div>
        <div>
          <NavBar/>
        </div>
      </header>
     
      <main className="container main-page"> 
        <div className="row">
          <div className="row">
            <Switch>
              <Route exact path="/" render={renderDogList}/>
              <Route path="/about" component={AboutPage}/>
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
  );
}

function NavBar() {
  return (
    <div className="nav-container">
      <ul id="nav">
        <li><NavLink exact to="/" activeClassName={"activeLink"}>Home</NavLink></li>
        <li><NavLink to="/about" activeClassName={"activeLink"}>About Us</NavLink></li>
      </ul>
    </div>
  );
}

// function NavBarSecond() {
//   return(
//     <Nav className="justify-content-center" activeKey="/home">
//     <Nav.Item>
//       <NavLink className="navButtons" exact to="/" activeClassName={"activeLink"}>Home</NavLink>
//     </Nav.Item>
//     <Nav.Item>
//       <NavLink className="navButtons" to="/about" activeClassName={"activeLink"}>About Us</NavLink>
//     </Nav.Item>
//   </Nav>

//   );
// }

function DogList(props) {
  let dogs = props.pets; //handle if not provided a prop
  let dogCards = dogs.map((dog) => {
    return <DogCard key={dog.BreedName} dog={dog} />;
  })

  const [sizes, setSizes] = useState(undefined);
  let handleSize = (sizes) => {
    setSizes(sizes);
  }

  if (sizes !== undefined && sizes !== null) {
    dogCards = dogs.map((dog) => {
      for (let i = 0; i < sizes.length; i++) {
        if (dog.Size == sizes[i].value) {
          return <DogCard key={dog.BreedName} dog={dog} />;
        }
      }
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
            return <DogCard key={dog.BreedName} dog={dog} />;
          }
        }
      }
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

export default App;

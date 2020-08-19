import React from 'react';
import Header from './components/header.jsx'
import Container from './components/container.jsx'
import Admin from './components/admin.jsx'
import {BrowserRouter, Route} from 'react-router-dom';

class Main extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      element: true,
    };

    this.setElem = this.setElem.bind(this);
   
  }
  
  render()
  {
    /*if(!this.state.isAdmin)
    {
      return (
        <div>
          <Header chan = {this.setElem} Admin = {this.enterAdmin}/>
          <Container show = {this.state.element} chan = {this.setElem}/>
        </div>
      );
    }
    else
    {
      return(
       <div>
          <Header chan = {this.setElem} Admin = {this.enterAdmin}/>
          <Admin/>
       </div>
      );
    }*/

    return(
      <BrowserRouter>
        <Header chan = {this.setElem}/>
        <Route exact path ='/'>
          <Container show = {this.state.element} chan = {this.setElem}/>
        </Route>
        <Route path = '/admin'>
          <Admin/>
        </Route>
      </BrowserRouter>
    );
    
   
  }

  setElem(elem)
  {
    this.setState({element: elem});
  }

  
  
}



export default Main;

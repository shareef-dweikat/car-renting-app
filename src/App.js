import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/app.css'
import Navbar from './components/layout/Navbar'
import LeftMenu from './components/layout/LeftMenu';
import CarsList from './components/cars/CarsList';
import CarDetails from './components/cars/CarDetails';
import UserHistory from './components/user/UserHistory';
import SingIn from './components/auth/SignIn';

function App(props) {
  return (
    <BrowserRouter>
        <div>
            <Navbar />

            <div className="left-menu">
              <LeftMenu/>
            </div>

            <Route exact path='/singin'component={SingIn} />

            <div className="cars-list">
                <Switch>
                    <Route exact path='/'component={CarsList} />
                    <Route exact path='/history'component={UserHistory} />
                    <Route exact path='/details/:car_id'component={CarDetails} />
                </Switch>
            </div>
            
        </div>
    </BrowserRouter>
  );
}

export default App;

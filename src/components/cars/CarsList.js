import React from 'react';
import CarCard from './CarCard';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {getCarsAction} from '../../store/actions/carAction'

class  CarsList extends React.Component{

  componentDidMount(){
    this.props.fetchCarsFromAPI()
  }
  render(){

      //if an email exists in the store that means a user is logged in.
      //if a user requests carsList  while he/her is not logged in, redirect him/her to signin page
    const { email } = this.props;
    if (!email) return <Redirect to='/singin' /> 

    let {carsList}=this.props
    
    /*getting cars list object form store, turning it into an array, 
    then turning it into UI by filling it in CarCard */

    carsList=carsList&&Object.keys(carsList).map((id)=><CarCard {...this.props} key={carsList[id].name} car={carsList[id]} id={id}/>)
    
    
  return (
    <div className="container">
      
        {carsList}
      
    </div>
  );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarsFromAPI: () => dispatch(getCarsAction())
  }
}
const mapStateToProps = (state) => {
  return {
    carsList:state.cars.carsForRent,
    email:state.auth.email
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(CarsList)
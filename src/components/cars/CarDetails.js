import React from 'react';
import {connect} from 'react-redux'
import {getCarDetailsAction} from '../../store/actions/carAction'
import {DeleteCarAction} from '../../store/actions/carAction'
import {editCarAction} from '../../store/actions/carAction'
import {rentCarAction} from '../../store/actions/carAction'
import '../../styles/cardDetails.css'
import Modal from 'react-modal';
import EditCarForm from './EditCarForm'
import RentCarForm from './RentCarForm'
import { Redirect } from 'react-router-dom'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

 Modal.setAppElement(document.getElementById('root'))


class  CarDetails extends React.Component {
  
  componentDidMount(){
  //fetching car data from API and storing them in store
  this.props.fetchCarDetails(this.props.match.params.car_id)
}

constructor() {
  super();

  this.state = {
    modalIsOpen: false,
    actionType:''
  };

  this.openModal = this.openModal.bind(this);
  this.afterOpenModal = this.afterOpenModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
}

openModal(actionType) {
  this.setState({modalIsOpen: true,actionType:actionType});
}

afterOpenModal() {
  // references are now sync'd and can be accessed.
  //this.subtitle.style.color = '#f00';
}

closeModal() {
  this.setState({modalIsOpen: false});
}

handleDelete=()=>{
  this.props.handleDelete(this.props.match.params.car_id)
  this.props.history.push('/')
}

handleEdit=(car)=>{
  this.props.handleEdit(car,this.props.match.params.car_id)
  this.closeModal()
}
handleRent=(rentDetails)=>{
 
  //this line extracts username out of email, then store it.
 let username=this.props.username&&this.props.username.substring(0,this.props.username.length-9)
 
 this.props.handleRent(rentDetails,username)
 this.closeModal()
}
  render (){

      //if an email exists in the store that means a user  is logged in.
      //if a user requests carDetails  while he/her is not logged in, redirect him/her to signin page
    const { email } = this.props;
    if (!email) return <Redirect to='/singin' /> 

    let carId=this.props.match.params.car_id

    //if the user logged in is an admin, show edit and delete button in car details page.
    // if not, return null.
    let editAndDeleteButtons= this.props.email=='admin@exalt.ps'? (
      <React.Fragment>
      <button className="button-margin" onClick={()=>this.handleDelete()} >Delete</button>
      <button className="button-margin" onClick={()=>this.openModal()}>Edit</button>
     </React.Fragment>
      )
      : null

    return this.props.car?(
        <div className="container">
           <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add New Car Modal">
            
            {
              /*the following condition decides what form should be renderd in the Modal,
              depending on the button (rent or edit buttons) the user clicks */

              this.state.actionType=='rent'
             ?<RentCarForm car={this.props.car} carId={carId} handleRent={this.handleRent} username={this.props.username} closeModal={this.closeModal} />
             :<EditCarForm  car={this.props.car}  handleEdit={this.handleEdit} closeModal={this.closeModal}/>
             }
        </Modal>
<div className="clearfix">

  <div className="box">
  <span style={{fontSize:"3vw"}} >{this.props.car.name}</span>
  </div>

  <div className="box-buttons">
      <div style={{float:"right"}}>

      {editAndDeleteButtons}
      <button disabled={this.props.car.isRented} onClick={()=>this.openModal("rent")}>Rent</button>
      </div>
  </div>
</div>
          
       <img style={{width:300}} src={this.props.car.image} />
          <h5>Cost Per Day: {this.props.car.cost}</h5>
          <h5>{this.props.car.details}</h5> 
        </div>
      ):null
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
        fetchCarDetails:(id)=>dispatch(getCarDetailsAction(id)),
        handleDelete:(id)=>dispatch(DeleteCarAction(id)),
        handleEdit:(car,id)=>dispatch(editCarAction(car,id)),
        handleRent:(rentDetails,username)=>dispatch(rentCarAction(rentDetails,username))
  }
}

const mapStateToProps=(state)=>{
  return {
      car:state.cars.carDetails,
      email:state.auth.email
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CarDetails)



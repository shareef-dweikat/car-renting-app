import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import {connect} from 'react-redux'
import AddCarForm from '../cars/AddCarForm';
import {addCarAction} from '../../store/actions/carAction'
import {signOutAction} from '../../store/actions/authActions'
import Modal from 'react-modal';
import '../../styles/navbar.css'

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

class  Navbar extends React.Component {

  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
 
   handleAdd=(car)=>{

    this.props.addCarToStore(car)
    this.setState({modalIsOpen:false})
  }
  handleSignOut=()=>{
    this.props.signOut()
    this.props.history.push('/singin')
  }

 render(){
   let {email}=this.props

   let addNewCarIcon=<i className="material-icons" onClick={this.openModal} style={{cursor:"pointer"}}>add</i>
  
   //if admin is logged in, show add new car icon.
   let addNewCarButton= email=='admin@exalt.ps'?addNewCarIcon:null

   let signOutIcon=<div onClick={this.handleSignOut}>Sign Out</div>
   //if logged in, show sign out button
   let signOutButton= email!=undefined?signOutIcon:null


  return (
    <div>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add New Car Modal">
            
           <AddCarForm handleAdd={this.handleAdd} closeModal={this.closeModal}/>

        </Modal>
      <nav className="nav-wrapper grey darken-3">
      <div className="container" >
       
              <div className="nav-app-title">
                  <Link  to='/'>Exalt Renting Co</Link>
              </div>

              <div className="nav-sign-out-button">
                  {signOutButton}
              </div>

              <div className="nav-add-button">
                  {addNewCarButton}
              </div>

          </div>
    
    </nav>
     
  </div>
    );
 }
}
   
 
const mapStateToProps = (state) => {

  return {
    email:state.auth.email
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addCarToStore: (car) => dispatch(addCarAction(car)),
    signOut:()=>dispatch(signOutAction())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar))
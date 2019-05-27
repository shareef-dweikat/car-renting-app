import React from 'react';
import {connect} from 'react-redux'
import {getHistoryAction} from '../../store/actions/userActions'
import { Redirect } from 'react-router-dom'

class  UserHistory extends React.Component {

  componentDidMount(){
    
    //extracting username form email
    let {email}=this.props
    let username=email&&email.substring(0,email.length-9)
    this.props.getHistory(username)
  }

  render(){
    const { email } = this.props;
    if (!email) return <Redirect to='/singin' /> 

    let {history}=this.props

    //if history is loaded, omit the key of each item of the object history then store the item in an array named historyList
    let historyList=history && Object.keys(history).map((id)=>history[id])
   
    //turn the array historyList into UI
    let collectionList=history && historyList.map((item)=>{
    return <li className="collection-item">
            <div>CAR ID: {item.carId}</div>
            <div>RENTED FROM: {item.fromDate}</div>
            <div> TO: {item.toDate}</div>
        </li>
    })
     
    return (
      <div className="container">
        <h3>Your History</h3>
          <ul  className="collection">
            {collectionList}
          </ul>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    email:state.auth.email,
    history:state.user.history
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    getHistory:(username)=>dispatch(getHistoryAction(username))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserHistory);

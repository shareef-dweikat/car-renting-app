import React from 'react'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class  RentCarForm extends React.Component{

state={
  to:'',
  from:'',
  total:'',
  startDate: new Date()
}


handleSubmit=(e)=>{
  e.preventDefault()

  let {to,from}= this.state

  let toDate=`${to.getMonth()+1}/${to.getDate().toString()}/${to.getFullYear().toString()}`
  let fromDate=`${from.getMonth()+1}/${from.getDate().toString()}/${from.getFullYear().toString()}`

  let millisecondsInDay =(1000 * 3600 * 24)

  let differenceBetweenTwoDaysInMilliseconds=(new Date(toDate).getTime()-new Date(fromDate).getTime()) 
 
  let daysOfRent = differenceBetweenTwoDaysInMilliseconds/ millisecondsInDay 
 
  let totalCostOfRent=this.props.car.cost*daysOfRent
  
  this.props.handleRent({toDate,fromDate,totalCostOfRent,carId:this.props.carId})
}
handleChange = (s,e) => {
  this.setState({
    [s]: e
  })
}

render(){
  return (
    <div style={{width:600}}>    

        <form className="white" onSubmit={(e)=>this.handleSubmit(e)}>
              <h5 className="grey-text text-darken-3">Rent this Car</h5>

              <div>
                  <label htmlFor="from">From: </label>
                    <DatePicker
                     selected={this.state.from}
                    onChange={(e)=>this.handleChange("from",e)}/>
              </div>

              <div>
                  <label htmlFor="cost">To: </label>
                  <DatePicker
                  selected={this.state.to}
                  onChange={(e)=>this.handleChange("to",e)}/>        
              </div>
              
              <div className="input-field">
                   <button className="btn pink lighten-1 z-depth-0" style={{marginRight:8}}>Rent</button>
                   <button  onClick={this.props.closeModal} className="btn pink lighten-1 z-depth-0">Cancel</button>
              </div>

        </form>
</div>   
);
}
}

 export default RentCarForm

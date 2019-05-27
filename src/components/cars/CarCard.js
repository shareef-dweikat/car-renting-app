import React from 'react';
import '../../styles/carCard.css'
class CarCard extends React.Component {


render(){        
 
  let {car}=this.props
    return (
        
        <div className="card-container" onClick={()=>this.props.history.push(`/details/${this.props.id}`)}>

                <div className="card">
                    <h4 style={{textAlign:"center"}}>{car.name}</h4>
                      <div className="card-image">
                         <img src={car.image}  alt="no image" />
                      </div>
                      <div className="card-content">
                         <p>Cost Per Day: {car.cost}</p>
                         <p style={{overflow:"hidden",maxHeight:45,wordWrap: "break-word"}}>{car.details}</p>
                         {car.isRented?<p style={{color:"red",fontSize:12}}>NOT AVAILABLE</p>:null}
                      </div>
                </div>
                
      </div>
    )
 
  }
}


export default CarCard;

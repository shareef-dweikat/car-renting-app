import React from 'react'

class  EditCarForm extends React.Component{

state={
  name:'',
  cost:'',
  details:'',
  image:'',
  isRented:''
}

componentDidMount(){
    let {car}=this.props
    this.setState({
        name:car.name,
        cost:car.cost,
        details:car.details,
        image:car.image,
        isRented:car.isRented
    })
}

handleSubmit=(e)=>{
  e.preventDefault()
  this.props.handleEdit(this.state)
}
handleChange = (e) => {
  this.setState({
    [e.target.id]: e.target.value
  })
}
render(){
  return (
    <div style={{width:600}}>    

        <form className="white" onSubmit={(e)=>this.handleSubmit(e)}>
            <h5 className="grey-text text-darken-3">Edit Car</h5>

              <div >
                  <label htmlFor="name">Name</label>
                  <input type="text" id='name' onChange={(e)=>this.handleChange(e)}  value={this.state.name} />
              </div>

              <div>
                  <label htmlFor="cost">Cost Per Day</label>
                  <input type="number" id='cost'  onChange={(e)=>this.handleChange(e)} value={this.state.cost} />
              </div>

              <div>
                  <label htmlFor="image">Upload image</label>
                  <input type="text" id='image'  onChange={(e)=>this.handleChange(e)}  value={this.state.image} />
              </div>

              <div>
                  <label htmlFor="details">details</label>
                  <textarea style={{borderStyle:"none",borderBottomStyle:"solid"}} type="text" id='details'  onChange={(e)=>this.handleChange(e)}  value={this.state.details}/>
              </div>

              <div className="input-field">
                   <button className="btn pink lighten-1 z-depth-0" style={{marginRight:8}}>Edit</button>
                   <button  onClick={this.props.closeModal} className="btn pink lighten-1 z-depth-0">Cancel</button>
              </div>

        </form>
</div>   
);
}
}

 export default EditCarForm

import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import '../../styles/leftMenu.css'

function LeftMenu(props) {

      //If admin is logged in, dont show history link in leftMenu,
      // because It should be shown to normal users only.
      let historyLink= props.email!='admin@exalt.ps'?<Link to="/history">History</Link>: null

        // if  email exists in the store, that means admin or normal user is logged in.
       //the leftMenu should be renderd on the screen only if the a user (normal user or admin) is logged in.
      return props.email
      ? (  
            <div className="sidebar">
                <img  src={"https://i.pravatar.cc/200"} alt="no image" />
                <Link to="/" style={{ display:"block",marginBottom:8}}>Cars</Link>
                {historyLink}
            </div>
      )
      : null
     
}

const mapStateToProps=(state)=>{
    return{
        email:state.auth.email
    }
}

export default connect(mapStateToProps)(LeftMenu);

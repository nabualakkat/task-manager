
import React from 'react';
import {Route, Redirect} from 'react-router-dom';


 function PrivateRoute ({component: Component, isAuth, ...rest}) {   
  return (
    <Route 
        {...rest} 
        render={(props)=>{       
            if(!window.localStorage.getItem('token')) {
                return  <Redirect to="/"/>                   
            } else {                    
                return <Component {...props}/>
            }
            
    }} />
)    
}


export default PrivateRoute;
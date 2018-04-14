import React from 'react'
import { connect } from 'dva';
import Login from '../components/login/login';

export function LoginApsms({history, dispatch, login}) {
    // const { username } = login;
   
    console.log(login)
    const loginProps = {
        submit(values) {
            dispatch({
                type: 'login/checkLogin',
                payload: {
                    values
                }
            });
        }
    }
    
    return(
        <Login {...loginProps}/>
    );
}

function mapStateToProps({ login }) {
    return {login};
}
  
export default connect(mapStateToProps)(LoginApsms);
  
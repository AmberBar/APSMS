import React from 'react'
import { connect } from 'dva';
import Login from '../components/login/login';

export function LoginApsms({history, dispatch, login}) {
    // const {} = login;
    const loginProps = {

    }
    
    return(
        <Login />
    );
}

function mapStateToProps({ login }) {
    return {login};
}
  
export default connect(mapStateToProps)(LoginApsms);
  
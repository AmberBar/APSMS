import React from 'react'
import { connect } from 'dva';
import Register from '../components/login/Register';


export function RegisterUser({history, dispatch, register}) {
    const registerProps = {
        submit(values) {
            let params = {
                "admin": true,
            }
            delete values.confirm
            values = {...values, ...params}
            dispatch({
                type: 'register/registerUser',
                payload: values
            });
        }
    }
    
    return(
        <Register {...registerProps}/>
    );
}

function mapStateToProps({ register }) {
    return {register};
}
  
export default connect(mapStateToProps)(RegisterUser);
  
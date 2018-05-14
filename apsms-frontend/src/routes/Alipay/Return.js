import React from 'react'
import { connect } from 'dva';
import $ from 'jquery'

export function Alipay({history, dispatch, alipay}) {
    

    return(
        <div></div>
    );
}

function mapStateToProps({ alipay }) {
    return {alipay};
}
  
export default connect(mapStateToProps)(Alipay);
  
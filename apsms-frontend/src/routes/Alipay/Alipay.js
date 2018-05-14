import React from 'react'
import { connect } from 'dva';
import Pay from "../../components/Alipay/Alipay"
import $ from 'jquery'

export function Alipay({history, dispatch, alipay}) {
    let { fromData } = alipay

    let props = {
        fromData
    }

    if ($.isEmptyObject(fromData)) {
        return <div></div>
    }
    
    else {
        return(
            <Pay {...props} />
        );
    }
}

function mapStateToProps({ alipay }) {
    return {alipay};
}
  
export default connect(mapStateToProps)(Alipay);
  
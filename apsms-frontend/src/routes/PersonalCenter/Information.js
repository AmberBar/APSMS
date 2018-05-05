import React from 'react'
import { connect } from 'dva';
import MainLayout from '../../components/MainLayout/MainLayout';
import PersonalInformation from "../../components/PersonalCenter/PersonalInformation"
import styles from "./Information.less"
export function Information({history, dispatch, personal_information}) {

    return(
        <MainLayout >
            <PersonalInformation />
        </MainLayout>
    );
}

function mapStateToProps({ personal_information }) {
    return {personal_information};
}
  
export default connect(mapStateToProps)(Information);
  
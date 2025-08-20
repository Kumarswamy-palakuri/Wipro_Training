import React, {Component} from 'react';
import './employeeSearch.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as employeeSearchActions from "../../store/employeeSearch/actions";
export default class employeeSearch extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-employee-search">Hello! component employeeSearch</div>;
    }
  }
// export default connect(
//     ({ employeeSearch }) => ({ ...employeeSearch }),
//     dispatch => bindActionCreators({ ...employeeSearchActions }, dispatch)
//   )( employeeSearch );
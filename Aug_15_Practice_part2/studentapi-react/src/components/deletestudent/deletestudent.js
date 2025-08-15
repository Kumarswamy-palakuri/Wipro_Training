import React, {Component} from 'react';
import './deletestudent.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as deletestudentActions from "../../store/deletestudent/actions";
export default class deletestudent extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-deletestudent">Hello! component deletestudent</div>;
    }
  }
// export default connect(
//     ({ deletestudent }) => ({ ...deletestudent }),
//     dispatch => bindActionCreators({ ...deletestudentActions }, dispatch)
//   )( deletestudent );
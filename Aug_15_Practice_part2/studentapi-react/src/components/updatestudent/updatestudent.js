import React, {Component} from 'react';
import './updatestudent.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as updatestudentActions from "../../store/updatestudent/actions";
export default class updatestudent extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-updatestudent">Hello! component updatestudent</div>;
    }
  }
// export default connect(
//     ({ updatestudent }) => ({ ...updatestudent }),
//     dispatch => bindActionCreators({ ...updatestudentActions }, dispatch)
//   )( updatestudent );
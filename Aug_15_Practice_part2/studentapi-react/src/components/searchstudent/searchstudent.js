import React, {Component} from 'react';
import './searchstudent.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as searchstudentActions from "../../store/searchstudent/actions";
export default class searchstudent extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-searchstudent">Hello! component searchstudent</div>;
    }
  }
// export default connect(
//     ({ searchstudent }) => ({ ...searchstudent }),
//     dispatch => bindActionCreators({ ...searchstudentActions }, dispatch)
//   )( searchstudent );
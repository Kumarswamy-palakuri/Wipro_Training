import React, {Component} from 'react';
import './userShow.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as userShowActions from "../../store/userShow/actions";
export default class userShow extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-user-show">Hello! component userShow</div>;
    }
  }
// export default connect(
//     ({ userShow }) => ({ ...userShow }),
//     dispatch => bindActionCreators({ ...userShowActions }, dispatch)
//   )( userShow );
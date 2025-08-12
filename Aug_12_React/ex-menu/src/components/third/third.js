import React, {Component} from 'react';
import Menu from '../menu/menu';

const Third = (props) => {
  return(
    <div>
      <Menu />
      First Name : <b>{props.firstName}</b> <br/>
      Last Name : <b>{props.lastName}</b> <br/>
      Company : <b>{props.company}</b>
    </div>
  )
}

export default Third;
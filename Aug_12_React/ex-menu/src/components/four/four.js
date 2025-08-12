import React, {Component, useState} from 'react';
import Menu from '../menu/menu';

const Four = () => {

  const [name,setName] = useState('')

  const ajay = () => {
    setName("Hi I am Ajay");
  }

  const pralavi = () => {
    setName("Hi I am Pralavi...");
  }

  const uday = () => {
    setName("Hi I am Uday...");
  }

  return(
    <div>
      <Menu />
      <input type="button" value="Ajay" onClick={ajay} />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="button" value="Pralavi" onClick={pralavi} /> 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="button" value="Uday" onClick={uday} />
      <hr/>
      Name is : <b>{name}</b>
    </div>
  )
}

export default Four;
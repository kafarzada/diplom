
import React from 'react';
import OwnTable from '../layout/OwnTable';

const Client = (props) => {


  const data = [
    {firstName: "Иван", lastName: "1"},
    {firstName: "Иван", lastName: "2"},
    {firstName: "Иван", lastName: "3"},
    {firstName: "Иван", lastName: "4"},

  ]
  const titles = ["Имя", "Фамилия"]

  return (
    <div>
      <OwnTable titles={titles} data = {data} />
    </div>
  )
};



export default Client;
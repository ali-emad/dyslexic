import React from 'react';
import styled from '@emotion/styled';

const FileView = ({ data, onClickFunc }) => {
  return (
    <Wraper className='d-flex justify-content-evenly align-items-center w-100 mt-1 mb-1'>
      <span>{data.name}</span>
      <span>{data.time}</span>
      {/* <span>
        Read File:
        {data.read ? ' Yes' : ' No'}
      </span> */}
      <button onClick={() => onClickFunc()}> Read File </button>
    </Wraper>
  );
};

export default FileView;
const Wraper = styled.div`
  background-color: aliceblue;
  span {
    margin: 10px;
  }
  button {
    background-color: aliceblue;
    border-color: #96adfc;
    font-weight: bold;
    border-radius: 5px;
    /* border: 5px; */
  }
`;

import React, { useRef } from 'react';
import styled from '@emotion/styled';

const FileUpload = ({ uploadFile }) => {
  const inputRef = useRef();
  const saveFile = (e) => {
    const file = e.target.files[0];
    let fileName = e.target.files[0]?.name;
    let reader = new FileReader();
    reader.onload = (e) => {
      const file = e.target.result;

      if (fileName && file.length) {
        uploadFile({ name: fileName, data: file });
      }
    };
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
  };

  return (
    <Wraper className='d-flex flex-column justify-content-center align-items-center w-100'>
      <input type='file' accept='.txt' onChange={saveFile} ref={inputRef} />
      <span
        className='p-2 m-2'
        onClick={() => {
          inputRef.current.click();
        }}
      >
        Upload File
      </span>
    </Wraper>
  );
};

export default FileUpload;
const Wraper = styled.div`
  font-size: larger;
  input[type='file'] {
    opacity: 0;
  }
  span {
    cursor: pointer;
    background-color: #dbe1f1;
    border-radius: 5px;
  }
`;

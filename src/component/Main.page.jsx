import React, { useEffect, useReducer, useState } from 'react';
import FileUpload from './FileUpload';
import _ from 'lodash';
import FileView from './FileView';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';
import FileViewer from './FileViewer';

const MainPage = () => {
  const getDate = () => {
    var today = new Date(),
      date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate() +
        ' ' +
        today.getHours() +
        ':' +
        today.getMinutes() +
        ':' +
        today.getSeconds();

    return date;
  };

  const [viewerPage, setViewerPage] = useState({ show: false, data: '' });

  const initialState = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case 'upload_file':
        return [
          ...state,
          {
            name: action.payload.name,
            data: action.payload.data,
            time: getDate(),
            read: false,
          },
        ];

      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Wraper className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
      {viewerPage.show && (
        <FileViewer
          data={viewerPage.data}
          closeFunc={() => {
            setViewerPage({ show: false, data: '' });
          }}
        />
      )}
      {!viewerPage.show && (
        <>
          <FileUpload
            uploadFile={(e) => {
              dispatch({
                type: 'upload_file',
                payload: { name: e.name, data: e.data },
              });
            }}
          />
          {_.map(state, (i) => (
            <div
              className='d-flex flex-column justify-content-center align-items-center w-100'
              key={uuid()}
            >
              <FileView
                data={i}
                key={uuid()}
                onClickFunc={() => setViewerPage({ show: true, data: i.data })}
              />
            </div>
          ))}
        </>
      )}
    </Wraper>
  );
};

export default MainPage;
const Wraper = styled.div`
  background-color: #d8d3d6;
`;

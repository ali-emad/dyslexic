import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faXmark } from '@fortawesome/free-solid-svg-icons';

const FileViewer = ({ data, closeFunc }) => {
  const [exData, setexData] = useState('');
  const [text, settext] = useState();
  const [page, setpage] = useState(0);
  const [finish, setfinish] = useState(false);
  const [rerender, setrerender] = useState(0);
  const [hue, sethue] = useState(false);

  useEffect(() => {
    setfinish(false);
    let temp = data
      .trim()
      .replace(/[\r\n]/gm, '')
      .split(/[.?]+/);
    let tempData = [];
    _.map(temp, (i, j) => {
      if (i.length) {
        let size = _.size(i.split(' '));
        let tempTime = 0;
        if (size < 4) {
          tempTime = 500;
        } else if (size < 10) {
          tempTime = 1000;
        } else {
          tempTime = 1500;
        }

        tempData.push({ time: tempTime, data: i });
      }
    });
    setexData(tempData);
  }, [data, rerender]);

  useEffect(() => {
    let lastTime = 0;
    _.map(exData, (i, j) => {
      setTimeout(() => {
        settext(i.data);
        setpage(j + 1);
      }, lastTime);
      setTimeout(() => {
        settext('');
        setpage(0);
        if (_.size(exData) === j + 1) {
          setfinish(true);
        }
      }, lastTime + i.time);
      lastTime += i.time + 200;
    });
    console.log(exData);
    return () => clearTimeout();
  }, [exData]);

  return (
    <Wraper className='d-flex flex-column justify-content-center align-items-center w-100 h-100 p-5'>
      {text}
      <div
        className='overlay'
        style={hue ? { display: 'block' } : { display: 'none' }}
      ></div>
      <div
        className='d-flex flex-column align-items-center justify-content-center p-0'
        style={{
          position: 'absolute',
          right: `2%`,
          top: `2%`,
          color: 'gray',
          width: '3%',
        }}
      >
        {page ? page : ''}
      </div>
      <div
        className='d-flex flex-column align-items-center justify-content-center p-0'
        style={{
          position: 'absolute',
          right: `2%`,
          bottom: `2%`,
          color: 'gray',
          whiteSpace: 'nowrap',
          zIndex: 3,
          //   width: '3%',
        }}
        onClick={() => {
          closeFunc();
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: '#96adfc' }}
          size='xl'
        />
        <span>Exit</span>
      </div>
      <div
        className='d-flex align-items-center justify-content-center p-0'
        style={{
          position: 'absolute',
          left: `2%`,
          bottom: `2%`,
          whiteSpace: 'nowrap',
          color: 'gray',
          zIndex: 3,
          //   width: '3%',
        }}
        onClick={() => {
          sethue((state) => !state);
        }}
      >
        <div
          className='dot me-2'
          style={
            hue
              ? { borderColor: '#6789f8', borderStyle: 'solid' }
              : { border: 'none' }
          }
        ></div>
        <span>{hue ? 'Diable Hue' : 'Enable Hue'}</span>
      </div>

      {finish && (
        <div
          onClick={() => {
            setrerender((state) => state + 1);
          }}
          className='d-flex flex-column justify-content-center align-items-center'
          style={{ zIndex: 3 }}
        >
          <FontAwesomeIcon
            icon={faReply}
            style={{ color: '#96adfc' }}
            size='6x'
          />
          <span>Reply</span>
        </div>
      )}
    </Wraper>
  );
};

export default FileViewer;
const Wraper = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  color: grey;
  span {
    color: #ffffffda;
  }
  .dot {
    height: 25px;
    width: 25px;
    background-color: #dbe1f1;
    border-radius: 50%;
    display: inline-block;
  }
  .overlay {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #dbe1f1;
    opacity: 0.5;
    z-index: 2;
    /* cursor: pointer; */
  }
`;

import React from 'react';
import Wrapper from './HeaderAction.style';
import DatePicker from 'react-datepicker';

const HeaderAction = ({
  fromDate,
  toDate,
  onChangeFromDate,
  onChangeToDate,
  handleTimeRange,
}) => {
  return (
    <Wrapper>
      <div className="group-date-range">
        <div className="item-date">
          <div>
            <i className="far fa-calendar-alt"></i>
            <DatePicker
              selected={fromDate}
              onChange={onChangeFromDate}
              showTimeSelect
              dateFormat="dd-MM-yyyy kk:mm:ss"
            />
          </div>
        </div>
        <div style={{ fontSize: 30 }}>~</div>
        <div
          className="item-date"
          style={{ marginRight: '20px', marginLeft: '20px' }}
        >
          <div>
            <i className="far fa-calendar-alt"></i>
            <DatePicker
              selected={toDate}
              onChange={onChangeToDate}
              showTimeSelect
              dateFormat="dd-MM-yyyy kk:mm:ss"
            />
          </div>
        </div>
        <button className="btn btn-success btn-sm" onClick={handleTimeRange}>
          <i className="fas fa-check" style={{ marginRight: '5px' }}></i>
          Áp dụng
        </button>
      </div>
    </Wrapper>
  );
};

export default HeaderAction;

import styled from 'styled-components';

export default styled.div`
  .group-date-range {
    display: flex;
    justify-content: center;
    align-items: center;

    .item-date {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:first-child {
        margin-right: 20px;
      }

      label {
        font-weight: 500;
        margin-right: 10px;
        margin-bottom: unset;
      }

      & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 3px;
        border: 1px solid #007bff;

        i {
          font-size: 27px;
          color: #fff;
          padding: 4px 6px;
          background-color: #007bff;
        }
        input {
          padding: 5px;
          border-left: 1px solid #007bff;
          border: none;
        }
      }
    }

    .btn-accept {
      border: 1px solid green;
      border-radius: 3px;
      background-color: green;
      padding: 5px 10px;
      color: #ffff;
    }
  }

  .line-chart {
    justify-content: center;
    display: flex;
  }
`;

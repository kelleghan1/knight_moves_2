import { css } from 'styled-components'

export const SquareStyles = css`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 6px;
  background-color: #fff;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    float: left;
  }

  &.grey {
    background-color: #e2e2e2;
  }

  .square-coords {
    display: flex;
    flex-grow: 1;
    background-color: #fff;
    padding: 2px;
    box-sizing: border-box;

    &.grey {
      background-color: #e2e2e2;
    }

    &:hover {
      position: absolute;
      font-size: 8px;
      transform: scale(2);
      min-width: 20px;
      min-height: 20px;
      border: 1px solid black;
    }
  }

  @media (max-width: 700px) {
    .square-coords {
      font-size: 4px;
    }
  }

  @media (max-width: 530px) {
    .square-coords {
      font-size: 3px;
    }
  }

  @media (max-width: 450px) {
    .square-coords {
      font-size: 0px;
    }
  }
`

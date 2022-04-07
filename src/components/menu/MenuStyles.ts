import { css } from 'styled-components'

export const MenuStyles = css`
  display: flex;
  padding: 12px;

  .axis-input-wrapper,
  .coord-button-wrapper {
    flex-shrink: 1;
    padding-right: 16px;

    & > label {
      padding: 6px;
      padding-left: 0px;

      &.mobile {
        display: none;
      }
    }

    & > button,
    & > input {
      padding: 6px;
      font-family: 'futura';
      background-color: transparent;
      border-radius: 4px;
    }

    & > input {
      width: 20px;
      border: 1px solid #e2e2e2;
    }

    & > button {
      background-color: #00c8e6;
      color: #fff;
      cursor: pointer;
      border: 1px solid #00c8e6;

      &:hover {
        background-color: #00d6f6;
      }

      &:disabled {
        background-color: #e2e2e2;
        border: 1px solid #e2e2e2;
        cursor: unset;
      }
    }
  }

  .turn-count-wrapper {
    flex-grow: 1;
    text-align: right;
    white-space: nowrap;

    & > label {
      padding: 6px;
      padding-left: 0px;
    }

    .turn-count-value {
      padding: 6px;
      height: 18px;
      display: inline-block;
      line-height: normal;
    }
  }

  @media screen and (max-width: 567px) {
    .axis-input-wrapper {
      & > label {
        display: none;

        &.mobile {
          display: unset;
        }
      }
    }
  }
`

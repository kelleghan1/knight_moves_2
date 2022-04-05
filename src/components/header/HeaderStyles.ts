import { css } from 'styled-components'

export const HeaderStyles = css`
  background-color: #000;
  padding: 10px;
  display: flex;

  .logo-wrapper {
    display: inline-block;
    width: 100px;
    flex-shrink: 1;

    img {
      display: block;
      width: 100%;
    }
  }

  .title-wrapper {
    flex-grow: 1;
    padding-left: 14px;

    h2.title {
      color: #fff;
    }
  }
`

import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { HeaderStyles } from './HeaderStyles'
import knightMovesLogo from '../../assets/images/knightmoves.png'

const HeaderStyled = styled.div`${HeaderStyles}`

export const Header: FunctionComponent = () => {
  return (
    <HeaderStyled>
      <div className='logo-wrapper'>
        <img src={knightMovesLogo} />
      </div>
      <div className='title-wrapper'>
        <h2 className='title'>
          Knight Moves
        </h2>
      </div>
    </HeaderStyled>
  )
}

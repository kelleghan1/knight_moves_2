import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Header } from './header/Header'
import { KnightMovesStyles } from './KnightMovesStyles'
import { Menu } from './menu/Menu'

const KnightMovesStyled = styled.div`${KnightMovesStyles}`

export const KnightMoves: FunctionComponent = () => {
  const [ activeCoords, setActiveCoords ] = useState(null)

  useEffect(() => {
    console.log('ACTIVE', activeCoords)
  },
  [ activeCoords ]
  )
  return (
    <KnightMovesStyled>
      <Header />
      <Menu onCoordsSelect={setActiveCoords}/>
    </KnightMovesStyled>
  )
}

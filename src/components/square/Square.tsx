import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import {
  Coords,
  HandleCoordsSelect
} from '../../types/common'
import { SquareStyles } from './SquareStyles'

const SquareStyled = styled.div`${SquareStyles}`

interface SquarePropsType {
  onCoordsSelect: HandleCoordsSelect
  activeCoords?: Coords
  xCoord: number
  yCoord: number
  isGrey: boolean
}

export const Square: FunctionComponent<SquarePropsType> = ({
  xCoord,
  yCoord,
  isGrey,
  onCoordsSelect
}) => {
  let className = 'square-coords'

  if (isGrey) className += ' grey'

  const handleClick = (): void => {
    onCoordsSelect({ x: xCoord, y: yCoord })
  }

  return (
    <SquareStyled className={className}>
      <div
        onClick={handleClick}
        className={className}
      >
        { `${xCoord}/${yCoord}` }
      </div>
    </SquareStyled>
  )
}

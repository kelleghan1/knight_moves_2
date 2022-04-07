import React, { FunctionComponent, useMemo } from 'react'
import styled from 'styled-components'
import {
  CoordsType,
  SetDestinationCoordsType
} from '../../types/common'
import { SquareStyles } from './SquareStyles'

const SquareStyled = styled.div`${SquareStyles}`

interface SquarePropsType {
  onCoordsSelect: SetDestinationCoordsType
  activeCoords?: CoordsType
  xCoord: number
  yCoord: number
  isGrey: boolean
  isHighlighted: boolean
}

export const Square: FunctionComponent<SquarePropsType> = ({
  xCoord,
  yCoord,
  isGrey,
  onCoordsSelect,
  isHighlighted
}) => useMemo(
  () => {
    let className = ''

    if (isGrey) className += ' grey'
    if (isHighlighted) className += ' highlighted'

    const handleClick = (): void => {
      onCoordsSelect({ x: xCoord, y: yCoord })
    }

    return (
      <SquareStyled
        onClick={handleClick}
        className={className}
      >
        <div className={'square-coords'}>
          { `${xCoord}/${yCoord}` }
        </div>
      </SquareStyled>
    )
  },
  [
    xCoord,
    yCoord,
    isGrey,
    onCoordsSelect,
    isHighlighted
  ]
)

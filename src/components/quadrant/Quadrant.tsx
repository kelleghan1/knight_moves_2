import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Coords, HandleCoordsSelect } from '../../types/common'
import { Square } from '../square/Square'
import { QuadrantStyles } from './QuadrantStyles'

const QuadrantStyled = styled.div`${QuadrantStyles}`

interface QuadrantPropsType {
  onCoordsSelect: HandleCoordsSelect
  activeCoords?: Coords
  quadrantSize: number
  xNegative?: boolean
  yNegative?: boolean
}

export const Quadrant: FunctionComponent<QuadrantPropsType> = ({
  onCoordsSelect,
  quadrantSize,
  xNegative,
  yNegative
}) => {
  const renderRow = (yCoord: number): ReactNode => {
    const squares = []

    for (let i = 0; i <= quadrantSize; i++) {
      const xCoord = xNegative ? -(i + 1) : i

      squares.push(
        <Square
          key={`${xCoord}${yCoord}`}
          isGrey={(xCoord + yCoord) % 2 === 0}
          xCoord={xCoord}
          yCoord={yCoord}
          onCoordsSelect={onCoordsSelect}
        />
      )
    }

    if (xNegative) squares.reverse()

    return (
      <div
        key={yCoord}
        className='row'
      >
        { squares }
      </div>
    )
  }

  const generateRows = (): ReactNode[] => {
    const rows = []

    for (let i = 0; i <= quadrantSize; i++) {
      const yCoord = yNegative ? -(i + 1) : i

      rows.push(renderRow(yCoord))
    }

    if (!yNegative) rows.reverse()

    return rows
  }

  return (
    <QuadrantStyled>
      {generateRows()}
    </QuadrantStyled>
  )
}

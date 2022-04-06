import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Coords, HandleCoordsSelect } from '../../types/common'
import { Square } from '../square/Square'
import { QuadrantStyles } from './QuadrantStyles'

const QuadrantStyled = styled.div`${QuadrantStyles}`

type SignEnum = 'positive' | 'negative'

interface QuadrantPropsType {
  onCoordsSelect: HandleCoordsSelect
  activeCoords?: Coords
  quadrantSize: number
  xSign: SignEnum
  ySign: SignEnum
}

export const Quadrant: FunctionComponent<QuadrantPropsType> = ({
  onCoordsSelect,
  quadrantSize,
  xSign,
  ySign
}) => {
  // const renderSquare = () => {

  // }

  const renderRow = (yValue: number): ReactNode => {
    const squares = []

    for (let i = 0; i <= quadrantSize; i++) {
      squares.push(
        <Square
          xValue={i}
          yValue={yValue}
        />
      )
    }

    return squares
  }

  const generateRows = (): ReactNode[] => {
    const rows = []

    for (let i = 0; i <= quadrantSize; i++) {
      rows.push(renderRow(i))
    }

    return rows
  }

  return (
    <QuadrantStyled>
      {generateRows()}
    </QuadrantStyled>
  )
}

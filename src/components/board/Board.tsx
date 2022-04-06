import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Coords, HandleCoordsSelect } from '../../types/common'
import { Quadrant } from '../quadrant/Quadrant'
import { BoardStyles } from './BoardStyles'

const BoardStyled = styled.div`${BoardStyles}`

interface BoardPropsType {
  onCoordsSelect: HandleCoordsSelect
  activeCoords?: Coords
  quadrantSize: number
}

export const Board: FunctionComponent<BoardPropsType> = ({
  onCoordsSelect,
  activeCoords,
  quadrantSize
}) => {
  return (
    <BoardStyled>
      <Quadrant
        xNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        xNegative={true}
        yNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        yNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
    </BoardStyled>
  )
}

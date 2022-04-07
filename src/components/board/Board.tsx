import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import {
  CoordsType,
  SetDestinationCoordsType,
  QuadrantCoordsType
} from '../../types/common'
import { Quadrant } from '../quadrant/Quadrant'
import { BoardStyles } from './BoardStyles'

const BoardStyled = styled.div`${BoardStyles}`

interface BoardPropsType {
  onCoordsSelect: SetDestinationCoordsType
  quadrantSize: number
  turnsTaken: CoordsType[]
}

export const Board: FunctionComponent<BoardPropsType> = ({
  onCoordsSelect,
  quadrantSize,
  turnsTaken
}) => {
  const modifyQuadrantActiveCoordsObject = (
    quadrant: QuadrantCoordsType,
    xCoord: number,
    yCoord: number
  ): void => {
    if (quadrant[xCoord]) {
      quadrant[xCoord].y[yCoord] = true
    } else {
      quadrant[xCoord] = {
        y: { [yCoord]: true }
      }
    }
  }

  const quadrantAActiveCoords = {}
  const quadrantBActiveCoords = {}
  const quadrantCActiveCoords = {}
  const quadrantDActiveCoords = {}

  for (let i = 0; i < turnsTaken.length; i++) {
    const activeCoord = turnsTaken[i]

    if (
      activeCoord.x < 0 &&
      activeCoord.y >= 0
    ) {
      modifyQuadrantActiveCoordsObject(
        quadrantAActiveCoords,
        activeCoord.x,
        activeCoord.y
      )
    } else if (
      activeCoord.x >= 0 &&
      activeCoord.y >= 0
    ) {
      modifyQuadrantActiveCoordsObject(
        quadrantBActiveCoords,
        activeCoord.x,
        activeCoord.y
      )
    } else if (
      activeCoord.x < 0 &&
      activeCoord.y < 0
    ) {
      modifyQuadrantActiveCoordsObject(
        quadrantCActiveCoords,
        activeCoord.x,
        activeCoord.y
      )
    } else {
      modifyQuadrantActiveCoordsObject(
        quadrantDActiveCoords,
        activeCoord.x,
        activeCoord.y
      )
    }
  }

  return (
    <BoardStyled>
      <Quadrant
        quadrantActiveCoords={quadrantAActiveCoords}
        xNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        quadrantActiveCoords={quadrantBActiveCoords}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        quadrantActiveCoords={quadrantCActiveCoords}
        xNegative={true}
        yNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        quadrantActiveCoords={quadrantDActiveCoords}
        yNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
    </BoardStyled>
  )
}

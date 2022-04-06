import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import {
  CoordsType,
  HandleCoordsSelectType,
  QuadrantCoordsType
} from '../../types/common'
import { Quadrant } from '../quadrant/Quadrant'
import { BoardStyles } from './BoardStyles'

const BoardStyled = styled.div`${BoardStyles}`

interface BoardPropsType {
  onCoordsSelect: HandleCoordsSelectType
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

  const quadrantA = {}
  const quadrantB = {}
  const quadrantC = {}
  const quadrantD = {}

  for (let i = 0; i < turnsTaken.length; i++) {
    const activeCoord = turnsTaken[i]

    if (
      activeCoord.x < 0 &&
      activeCoord.y >= 0
    ) {
      modifyQuadrantActiveCoordsObject(
        quadrantA,
        activeCoord.x,
        activeCoord.y
      )
    } else if (
      activeCoord.x >= 0 &&
      activeCoord.y >= 0
    ) {
      modifyQuadrantActiveCoordsObject(
        quadrantB,
        activeCoord.x,
        activeCoord.y
      )
    } else if (
      activeCoord.x < 0 &&
      activeCoord.y < 0
    ) {
      modifyQuadrantActiveCoordsObject(
        quadrantC,
        activeCoord.x,
        activeCoord.y
      )
    } else {
      modifyQuadrantActiveCoordsObject(
        quadrantD,
        activeCoord.x,
        activeCoord.y
      )
    }
  }

  return (
    <BoardStyled>
      <Quadrant
        quadrantActiveCoords={quadrantA}
        xNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        quadrantActiveCoords={quadrantB}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        quadrantActiveCoords={quadrantC}
        xNegative={true}
        yNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
      <Quadrant
        quadrantActiveCoords={quadrantD}
        yNegative={true}
        onCoordsSelect={onCoordsSelect}
        quadrantSize={quadrantSize}
      />
    </BoardStyled>
  )
}

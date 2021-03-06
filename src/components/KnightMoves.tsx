import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CoordsType, QuadrantSizeEnumType } from '../types/common'
import { Board } from './board/Board'
import { Header } from './header/Header'
import { KnightMovesStyles } from './KnightMovesStyles'
import { Menu } from './menu/Menu'

const KnightMovesStyled = styled.div`${KnightMovesStyles}`

interface KnightMovesPropsType {
  quadrantSize: QuadrantSizeEnumType
}

export const KnightMoves: FunctionComponent<KnightMovesPropsType> = ({ quadrantSize }) => {
  const [ destinationCoords, setDestinationCoords ] = useState(null)
  const [ turnsTaken, setTurnsTaken ] = useState([])
  const [ isMoving, setIsMoving ] = useState(false)

  const knightMoves = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: 2 }
  ]

  const validateFinalTurn = (coords: CoordsType): boolean => (
    coords.x === 0 &&
    coords.y === 0
  )

  const applyTurnsTaken = (turnsTaken: CoordsType[]): void => {
    const turnsReversed = turnsTaken.reverse()
    const turnsArray: CoordsType[] = []

    for (let i = 0; i < turnsReversed.length; i++) {
      setTimeout(
        () => {
          turnsArray.push(turnsReversed[i])
          setTurnsTaken([ ...turnsArray ])
          if (i === turnsReversed.length - 1) setIsMoving(false)
        },
        i * 200
      )
    }
  }

  const calculateNextTurnsRecursively = (
    currentPosition: CoordsType,
    turnsTaken: CoordsType[]
  ): void => {
    const nextPositions = []
    let closest = null

    if (validateFinalTurn(currentPosition)) return

    // FIND CLOSEST
    for (let i = 0; i < knightMoves.length; i++) {
      const nextPosition = {
        x: currentPosition.x + knightMoves[i].x,
        y: currentPosition.y + knightMoves[i].y
      }

      if (closest === null) {
        closest = nextPosition

        continue
      }

      const absoluteIterationCoordValue = Math.abs(nextPosition.x) + Math.abs(nextPosition.y)
      const absoluteClosestCoordValue = Math.abs(closest.x) + Math.abs(closest.y)

      if (absoluteIterationCoordValue < absoluteClosestCoordValue) {
        closest = nextPosition

        continue
      }

      const absoluteIterationCoordRatio = Math.abs((Math.abs(nextPosition.x) - Math.abs(nextPosition.y)))
      const absoluteClosestCoordRatio = Math.abs(Math.abs(closest.x) - Math.abs(closest.y))

      if (
        absoluteIterationCoordValue === absoluteClosestCoordValue &&
        absoluteIterationCoordRatio < absoluteClosestCoordRatio
      ) {
        closest = nextPosition
      }

      nextPositions.push(nextPosition)
    }

    if (validateFinalTurn(closest)) {
      turnsTaken.push(closest)

      return
    }

    // CHECK 3 STEPS AHEAD
    for (let i = 0; i < nextPositions.length; i++) {
      const nextPosition = nextPositions[i]
      const nextPositions2 = []

      // CREATE NEW POSITIONS 2
      for (let ii = 0; ii < knightMoves.length; ii++) {
        const nextPosition2 = { x: nextPosition.x + knightMoves[ii].x, y: nextPosition.y + knightMoves[ii].y }

        if (validateFinalTurn(nextPosition2)) {
          turnsTaken.push(
            nextPosition,
            nextPosition2
          )

          return
        }

        nextPositions2.push(nextPosition2)
      }

      for (let ii = 0; ii < nextPositions2.length; ii++) {
        const nextPosition2 = nextPositions2[ii]

        // CREATE NEW POSITIONS 3
        for (let n = 0; n < knightMoves.length; n++) {
          const nextPosition3 = { x: nextPosition2.x + knightMoves[n].x, y: nextPosition2.y + knightMoves[n].y }

          if (validateFinalTurn(nextPosition3)) {
            turnsTaken.push(
              nextPosition,
              nextPosition2,
              nextPosition3
            )

            return
          }
        }
      }
    }

    turnsTaken.push(closest)

    calculateNextTurnsRecursively(closest, turnsTaken)
  }

  useEffect(
    () => {
      if (!destinationCoords) return

      setIsMoving(true)

      const turnsTaken = [ destinationCoords ]

      calculateNextTurnsRecursively(destinationCoords, turnsTaken)

      applyTurnsTaken(turnsTaken)
    },
    [ destinationCoords ]
  )

  const onCoordsSelect = (coords: CoordsType): void => {
    if (!isMoving) {
      setDestinationCoords(coords)
    }
  }

  return (
    <KnightMovesStyled>
      <Header />
      <Menu
        isMoving={isMoving}
        onClearTurnsTakenClick={setTurnsTaken}
        quadrantSize={quadrantSize}
        destinationCoords={destinationCoords}
        turnsTaken={turnsTaken}
        onCoordsSelect={onCoordsSelect}
      />
      <Board
        turnsTaken={turnsTaken}
        quadrantSize={quadrantSize}
        onCoordsSelect={onCoordsSelect}
      />
    </KnightMovesStyled>
  )
}

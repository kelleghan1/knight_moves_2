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

  useEffect(
    () => {
      if (!destinationCoords) return

      const turnsTaken = [ destinationCoords ]

      const takeTurn = (currentPosition: CoordsType): void => {
        const nextPositions = []
        let closest = null

        if (validateFinalTurn(currentPosition)) return

        // CREATE NEW POSITIONS
        for (let i = 0; i < knightMoves.length; i++) {
          nextPositions.push({
            x: currentPosition.x + knightMoves[i].x,
            y: currentPosition.y + knightMoves[i].y
          })
        }

        // FIND CLOSEST
        for (let i = 0; i < nextPositions.length; i++) {
          const iteration = nextPositions[i]

          if (closest == null) {
            closest = iteration

            continue
          }

          const absoluteIterationCoordValue = Math.abs(iteration.x) + Math.abs(iteration.y)
          const absoluteClosestCoordValue = Math.abs(closest.x) + Math.abs(closest.y)

          if (absoluteIterationCoordValue < absoluteClosestCoordValue) {
            closest = iteration

            continue
          }

          const absoluteIterationCoordRatio = Math.abs((Math.abs(iteration.x) - Math.abs(iteration.y)))
          const absoluteClosestCoordRatio = Math.abs(Math.abs(closest.x) - Math.abs(closest.y))

          if (
            absoluteIterationCoordValue === absoluteClosestCoordValue &&
            absoluteIterationCoordRatio < absoluteClosestCoordRatio
          ) {
            closest = iteration
          }
        }

        if (validateFinalTurn(closest)) {
          turnsTaken.push(closest)

          return
        }

        // CHECK 3 STEPS AHEAD
        for (let j = 0; j < nextPositions.length; j++) {
          const nextPosition = nextPositions[j]
          const nextPositions2 = []

          // CREATE NEW POSITIONS 2
          for (let k = 0; k < knightMoves.length; k++) {
            const nextPosition2 = { x: nextPosition.x + knightMoves[k].x, y: nextPosition.y + knightMoves[k].y }

            if (validateFinalTurn(nextPosition2)) {
              turnsTaken.push(
                nextPosition,
                nextPosition2
              )

              return
            }

            nextPositions2.push(nextPosition2)
          }

          for (let l = 0; l < nextPositions2.length; l++) {
            const nextPosition2 = nextPositions2[l]

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

        takeTurn(closest)
      }

      takeTurn(destinationCoords)

      setTurnsTaken(turnsTaken)
    },
    [ destinationCoords ]
  )

  return (
    <KnightMovesStyled>
      <Header />
      <Menu
        quadrantSize={quadrantSize}
        destinationCoords={destinationCoords}
        turnsTaken={turnsTaken}
        onCoordsSelect={setDestinationCoords}
      />
      <Board
        turnsTaken={turnsTaken}
        quadrantSize={quadrantSize}
        onCoordsSelect={setDestinationCoords}
      />
    </KnightMovesStyled>
  )
}

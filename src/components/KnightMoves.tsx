import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Coords } from '../types/common'
import { Board } from './board/Board'
import { Header } from './header/Header'
import { KnightMovesStyles } from './KnightMovesStyles'
import { Menu } from './menu/Menu'

const KnightMovesStyled = styled.div`${KnightMovesStyles}`

interface KnightMovesPropsType {
  quadrantSize: number
}

export const KnightMoves: FunctionComponent<KnightMovesPropsType> = ({ quadrantSize }) => {
  const [ destinationCoords, setDestinationCoords ] = useState(null)
  const [ turnsTaken, setTurnsTaken ] = useState(null)

  const moves = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: 2 }
  ]

  useEffect(
    () => {
      if (!destinationCoords) return

      const turnsTaken = [ destinationCoords ]

      const start = (d: Coords): void => {
        const possibleMoves = []
        const closestArr = []
        let closest = null

        if (d.x === 0 && d.y === 0) {
          return
        }

        // CREATE NEW POSITIONS -----------------

        for (let i = 0; i < moves.length; i++) {
          possibleMoves.push({
            x: d.x + moves[i].x,
            y: d.y + moves[i].y
          })
        }

        // FIND CLOSEST -----------------

        for (let b = 0; b < possibleMoves.length; b++) {
          if (closest == null || (Math.abs(0 - possibleMoves[b].x) + Math.abs(0 - possibleMoves[b].y) <= (Math.abs(0 - closest.x) + Math.abs(0 - closest.y)))) {
            closest = possibleMoves[b]
          }
        }
        for (let u = 0; u < possibleMoves.length; u++) {
          if ((Math.abs(0 - possibleMoves[u].x) + Math.abs(0 - possibleMoves[u].y) === (Math.abs(0 - closest.x) + Math.abs(0 - closest.y)))) {
            closestArr.push(possibleMoves[u])
          }
        }
        for (let q = 0; q < closestArr.length; q++) {
          if (Math.abs((Math.abs(closestArr[q].x) - Math.abs(closestArr[q].y))) < Math.abs((Math.abs(closest.x) - Math.abs(closest.y)))) {
            closest = closestArr[q]
          }
        }

        // CHECK 3 STEPS AHEAD -----------------

        for (let j = 0; j < possibleMoves.length; j++) {
          if (closest.x === 0 && closest.y === 0) {
            turnsTaken.push(closest)
            return
          } else {
            const tempPos = []

            // CREATE NEW POSITIONS 2 -----------------

            for (let k = 0; k < moves.length; k++) {
              tempPos.push({ x: possibleMoves[j].x + moves[k].x, y: possibleMoves[j].y + moves[k].y })
            }

            for (let l = 0; l < tempPos.length; l++) {
              if (tempPos[l].x === 0 && tempPos[l].y === 0) {
                turnsTaken.push(possibleMoves[j])
                turnsTaken.push(tempPos[l])
                return
              } else {
                const tempPos2 = []

                // CREATE NEW POSITIONS 3 -----------------

                for (let n = 0; n < moves.length; n++) {
                  tempPos2.push({ x: tempPos[l].x + moves[n].x, y: tempPos[l].y + moves[n].y })
                }

                for (let m = 0; m < tempPos2.length; m++) {
                  if (tempPos2[m].x === 0 && tempPos2[m].y === 0) {
                    turnsTaken.push(possibleMoves[j])
                    turnsTaken.push(tempPos[l])
                    turnsTaken.push(tempPos2[m])
                    return
                  }
                }
              }
            }
          }
        }

        turnsTaken.push(closest)

        start(closest)
      }

      start(destinationCoords)

      console.log('@@@@@@', turnsTaken)
    },
    [ destinationCoords ]
  )

  return (
    <KnightMovesStyled>
      <Header />
      <Menu onCoordsSelect={setDestinationCoords} />
      <Board
        quadrantSize={quadrantSize}
        onCoordsSelect={setDestinationCoords}
      />
    </KnightMovesStyled>
  )
}

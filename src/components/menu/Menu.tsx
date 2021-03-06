import React,
{
  ChangeEventHandler,
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'
import {
  CoordsType,
  SetTurnsTakenType,
  QuadrantSizeEnumType,
  SetDestinationCoordsType
} from '../../types/common'
import {
  trueVal,
  validateNumber,
  validateStringNumberInput,
  validateStringNumber
} from '../../utils/helpers'
import { MenuStyles } from './MenuStyles'

const MenuStyled = styled.form`${MenuStyles}`

interface MenuPropsType {
  onCoordsSelect: SetDestinationCoordsType
  destinationCoords?: CoordsType
  turnsTaken?: CoordsType[]
  onClearTurnsTakenClick: SetTurnsTakenType
  quadrantSize: QuadrantSizeEnumType
  isMoving: boolean
}

export const Menu: FunctionComponent<MenuPropsType> = ({
  onCoordsSelect,
  destinationCoords,
  turnsTaken,
  quadrantSize,
  onClearTurnsTakenClick,
  isMoving
}) => {
  const [ x, setX ] = useState('')
  const [ y, setY ] = useState('')

  useEffect(
    () => {
      if (
        trueVal(destinationCoords?.x) &&
        trueVal(destinationCoords?.y) &&
        (
          `${destinationCoords.y}` !== y ||
          `${destinationCoords.x}` !== x
        )
      ) {
        setX(`${destinationCoords.x}`)
        setY(`${destinationCoords.y}`)
      }
    },
    [ destinationCoords ]
  )

  const validateCoordString = (coordString: string): boolean => (
    coordString === '' ||
    (
      validateStringNumberInput(coordString) &&
      coordString.split('-').join('').length < 3
    )
  )

  const handleXCoordinateChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const coordString = event.target.value

    if (validateCoordString(coordString)) setX(coordString)
  }

  const handleYCoordinateChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const coordString = event.target.value

    if (validateCoordString(coordString)) setY(coordString)
  }

  const handleCoordSubmit: MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()

    if (
      trueVal(x) &&
      trueVal(y)
    ) {
      const parsedX = parseInt(x)
      const parsedY = parseInt(y)

      if (
        validateNumber(parsedX) &&
        validateNumber(parsedY)
      ) {
        onCoordsSelect({
          x: parsedX,
          y: parsedY
        })
      }
    }
  }

  const handleClearClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()

    onClearTurnsTakenClick([])
    onCoordsSelect(null)
    setX('')
    setY('')
  }

  const validateCoordInputs = (): boolean => (
    validateStringNumber(x) &&
    validateStringNumber(y) &&
    Math.abs(parseInt(x)) <= quadrantSize &&
    Math.abs(parseInt(y)) <= quadrantSize
  )

  const renderTurnCount = (): string => {
    const turnCount = turnsTaken?.length ? `${turnsTaken.length - 1}` : '--'

    return turnCount
  }

  return (
    <MenuStyled>
      <div className='axis-input-wrapper'>
        <label
          className='mobile'
          htmlFor='x-coord-input'
        >
          X
        </label>
        <label htmlFor='x-coord-input'>X Coordinate</label>
        <input
          id='x-coord-input'
          onChange={handleXCoordinateChange}
          value={x}
          type='text'
        />
      </div>
      <div className='axis-input-wrapper'>
        <label
          className='mobile'
          htmlFor='y-coord-input'
        >
          Y
        </label>
        <label htmlFor='y-coord-input'>Y Coordinate</label>
        <input
          id='y-coord-input'
          onChange={handleYCoordinateChange}
          value={y}
          type='text'
        />
      </div>
      <div className='coord-button-wrapper'>
        <button
          disabled={!validateCoordInputs() || isMoving}
          onClick={handleCoordSubmit}
          type='submit'
        >
          Submit
        </button>
      </div>
      <div className='coord-button-wrapper'>
        <button onClick={handleClearClick} >
          Clear
        </button>
      </div>
      <div className='turn-count-wrapper'>
        <label>Turns:</label>
        <div className='turn-count-value'>
          { renderTurnCount() }
        </div>
      </div>
    </MenuStyled>
  )
}

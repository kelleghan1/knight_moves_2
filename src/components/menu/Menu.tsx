import React, { ChangeEventHandler, FunctionComponent, MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
import { Coords, HandleCoordsSelect } from '../../types/common'
import { trueVal, validateNumber, validateStringNumberInput, validateStringNumber } from '../../utils/helpers'
import { MenuStyles } from './MenuStyles'

const MenuStyled = styled.form`${MenuStyles}`

interface MenuPropsType {
  onCoordsSelect: HandleCoordsSelect
  activeCoords?: Coords
  activeCount?: number
}

export const Menu: FunctionComponent<MenuPropsType> = ({
  onCoordsSelect,
  activeCoords,
  activeCount
}) => {
  const [ x, setX ] = useState('')
  const [ y, setY ] = useState('')

  const validateCoordString = (coordString: string): boolean => (
    coordString === '' ||
    (
      validateStringNumberInput(coordString) &&
      coordString.split('-').join('').length < 4
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

  const validateCoordInputs = (): boolean => {
    console.log(
      validateStringNumber(x) &&
      validateStringNumber(y)
    )
    return (
      validateStringNumber(x) &&
      validateStringNumber(y)
    )
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
      <div className='coord-submit-wrapper'>
        <button
          disabled={!validateCoordInputs()}
          onClick={handleCoordSubmit}
          type='submit'
        >
          Submit
        </button>
      </div>
      <div className='turn-count-wrapper'>
        <label>Turns:</label>
        <div className='turn-count-value'>
          {activeCount || '--'}
        </div>
      </div>
    </MenuStyled>
  )
}

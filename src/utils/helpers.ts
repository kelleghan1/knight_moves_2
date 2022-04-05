export const validateNumber = (value: number | undefined | null): boolean => {
  return (
    typeof value === 'number' &&
    !isNaN(value)
  )
}

export const trueVal = (value: string | number | undefined | null): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    value !== ''
  )
}

export const validateStringNumberInput = (value: string): boolean => /^-?(\d+)?$/.test(value)

export const validateStringNumber = (value: string): boolean => /^-?\d+$/.test(value)

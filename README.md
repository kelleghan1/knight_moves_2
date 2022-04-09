# Knight Moves

Calculate the minimum number of moves needed for a chess knight to reach a given position. It provides a React component that will render an interactive chess board. This package is just for fun!

## Installation

```bash
npm install knight-moves
```

## Usage

The `KnightMoves` component requires the prop `quadrantSize` which accepts numbers between 5 and 15. The rendered board will be divided into quarters with the width and height of `quadrantSize`.

```typescript
import React from 'react'
import { KnightMoves } from 'knight-moves'

export const KnightMovesDemo = () => {
  return <KnightMoves quadrantSize={15} />
}
```

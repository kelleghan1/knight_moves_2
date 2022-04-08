import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom/client'
import { KnightMoves as KnightMovesDev } from './components/KnightMoves'
import { KnightMoves } from 'knight-moves'

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderContent = (): ReactElement =>
  <>
    <h2>DEV</h2>
    <KnightMovesDev quadrantSize={15}/>
    <h2>LIB</h2>
    <KnightMoves quadrantSize={15}/>
  </>

root.render(renderContent())

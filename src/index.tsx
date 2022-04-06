import React from 'react'
import ReactDOM from 'react-dom/client'
import { KnightMoves } from './components/KnightMoves'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<KnightMoves quadrantSize={15}/>)

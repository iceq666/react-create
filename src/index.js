import React from 'react'
import ReactDOM from 'react-dom';
import style from './style.css';

function App() {
  return (
    <h1 className={style.title}>hello</h1>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
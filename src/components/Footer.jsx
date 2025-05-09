import React from 'react'
import '../styles/App.css'

function Footer() {
  return (
    <footer className="footer">
        &#169; {`${new Date().getFullYear()}-Midnight Teerapong.H`}
    </footer>
  )
}

export default Footer
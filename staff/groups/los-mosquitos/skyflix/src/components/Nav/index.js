import React from 'react'
import literals from './literals'

function Nav({ lang, onList, onProfile, onLogout, onHome }) {
    const { list, profile, logout, home } = literals['en-US'] 
    
    return <nav className="home__menu" onClick={e => e.preventDefault()}>
        <img className="logo" src="" alt="Logo Skyflix"/>
        <a href="" onClick={() => onHome()}>{home}</a>
        <a href="" onClick={() => onList()}>{list}</a>
        <a href="" onClick={() => onProfile()}>{profile}</a>
        <a href="" onClick={() => onLogout()}>{logout}</a>
    </nav>
}

export default Nav
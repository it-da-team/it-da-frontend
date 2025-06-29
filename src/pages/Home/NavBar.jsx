import React from "react";
import { Link } from "react-router-dom";
import "../../App.css"

function NavBar({ isOpen }) {
    return (
        <nav className={`nav-bar ${isOpen ? 'open' : ''}`}>
            <Link to="/"><h3>채용 공고</h3></Link>
            <Link to="/community"><h3>온담(溫談)</h3></Link>
            <Link to="/talk"><h3>선배 톡톡</h3></Link>
            <Link to="/play"><h3>요즘 놀이</h3></Link>
            <Link to="/"><h3>잇다 마켓</h3></Link>
        </nav>
    );
}

export default NavBar;
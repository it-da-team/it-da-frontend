import React from "react";
import { Link } from "react-router-dom";
import "../../App.css"

function NavBar({ isOpen }) {
    return (
        <nav className={`nav-bar ${isOpen ? 'open' : ''}`}>
            <Link to="/"><h3>채용 공고</h3></Link>
            <Link to="/story"><h3>현장 이야기</h3></Link>
            <Link to="/talk"><h3>교사 톡톡</h3></Link>
            <Link to="/play"><h3>요즘 놀이</h3></Link>
        </nav>
    );
}

export default NavBar;
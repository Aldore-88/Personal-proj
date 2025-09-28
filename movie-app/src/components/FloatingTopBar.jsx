import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function FloatingTopBar() {
    return (
        <div style={{
        position: "fixed",
        top: "0",
        right: "1rem",
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.4)",
        padding: "0.3rem 0.5rem",
        borderRadius: ("0 0 8px 8px"),
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000, //stacking order property
    }}>
        <FaGithub size={24} style={{marginRight: "0.5rem"}} />
        <span style={{marginRight: "0.5rem", fontWeight: "bold"}}>Bevan Tan</span>
        <a 
        href="https://github.com/Aldore-88/Personal-proj/tree/master/movie-app"
        target="_blank" //opens in new tab
        rel="noopener noreferrer" //best practice??
        style={{color: "#0366ff", textDecoration: "none", fontWeight: "bold"}}
        >
        GitHub Link
        </a>
    </div>
    );
}
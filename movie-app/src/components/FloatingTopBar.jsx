import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function FloatingTopBar() {
    return (
        <div style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.9)",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000
    }}>
        <FaGithub size={24} style={{ marginRight: "0.5rem" }} />
        <span style={{ marginRight: "0.5rem", fontWeight: "bold" }}>Bevan Tan</span>
        <a 
        href="https://github.com/Aldore-88/Personal-proj/tree/master/movie-app"
        target="_blank" //opens in new tab
        rel="noopener noreferrer" //best practice??
        style={{ color: "#0366d6", textDecoration: "none", fontWeight: "bold" }}
        >
        GitHub Project
        </a>
    </div>
    );
}
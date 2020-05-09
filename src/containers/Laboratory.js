import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./Home.css";

export default function Laboratory(props) {

    function RenderUnAuthLabLander() {
        return (
            <div className="Laboratory align-middle center">
            <h1 className="Black-Ops radioactive">Restricted Access</h1>
            <h3 className="center pale-silver">Please Sign up or in to proceed</h3>
            <div className="buttons">
                <Link to="/login" className="btn btn-lg">
                    Login
                </Link>
                <Link to="/signup" className="btn btn-lg center">
                    Signup
                </Link>
            </div>
        </div>
        )
    }

    function RenderLaboratoryLander() {
        return (
            <div>
            <Link to="/scenebuilder"><h1 className="pull-left align-middle Aladin">SceneBuilder Tool</h1></Link>            
            <Link to="/premisebuilder"><h1 className="pull-right align-middle Aladin">PremiseBuilder Tool</h1></Link>
        </div>
        )
    }

    return (
        <div className="Laboratory">
            {props.isAuthenticated ? RenderLaboratoryLander() : RenderUnAuthLabLander()}
        </div>
    )
} 
import React from "react";
import "./Lander.css";
import { Link } from "react-router-dom"; 

export default function Lander(props) {

    return (
        <div>
            <Link to="/laboratory"><h1 className="pull-left align-middle Aladin">&#9756; The Laboratory</h1></Link>            
            <Link to="/library"><h1 className="pull-right align-middle Aladin">The Library &#9758;</h1></Link>
        </div>
      );
}
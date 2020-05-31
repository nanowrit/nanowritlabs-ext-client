import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import * as qs from "query-string";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Button } from "react-bootstrap";

export default function PatreonConnect(props) {
    const location = useLocation();
    // const { code } = useParams();
    const parse = qs.parse(location.search);
    const path = "/patreon-connect/" + parse.code;
    // TODO take query code from url and assign it to a variable
    // TODO send the code variable up to the lambda function as a path parameter (ie. /patreon/:code)
    // How do I set the code to a path variable?

    // useEffect(() => {
    //     const currentPath = location.pathname;
    //     const searchParams = new URLSearchParams(location.search);
    // }, [location]);
    function handleSubmit(event) {
        event.preventDefault();
        console.log(path);
        props.history.push({path});
    }

    return (
      <div className="PatreonConnect">
        <h2>You are connected with Patreon: </h2>
        <h3>{parse.code}</h3>
            <Link to={path}>
                <h1 className="spanish-gray center Aladin">{parse.code}</h1>
            </Link>
      </div>
    );
}
import React from "react";
import {Link} from "react-router-dom"

function ClosedAppList (props) {
    return (
        <tr>
            <th scope="row"><Link to={`/closed/${props.app.id}`}>{props.app.employer}</Link></th>
            <td>{props.app.title}</td>
            <td><a href={props.app.link} target="_blank" rel='noreferrer noopener'>{props.app.link}</a></td>
            <td>{props.app.applied_date}</td>
            <td>{props.app.closed_date}</td>
        </tr>
    )
}

export default ClosedAppList
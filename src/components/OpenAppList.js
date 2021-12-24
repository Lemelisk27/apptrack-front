import React from "react";
import {Link} from "react-router-dom"

function OpenAppList (props) {
    return (
        <tr>
            <th scope="row"><Link to={`/app/${props.app.id}`}>{props.app.employer}</Link></th>
            <td>{props.app.title}</td>
            <td><a href={props.app.link} target="_blank" rel='noreferrer noopener'>{props.app.link}</a></td>
            <td>{props.app.applied_date}</td>
        </tr>
    )
}

export default OpenAppList
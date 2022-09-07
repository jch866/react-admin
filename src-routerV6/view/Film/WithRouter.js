import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
export default function WithRouter(Component) {
        return null;
    // return function (props) {
    //     const push = useNavigate();
    //     const match = useParams();
    //     const location = useLocation();
    //     return <Component  {...props} history={{ push, match, location }} />
    // }
}

//withRouter(Component)
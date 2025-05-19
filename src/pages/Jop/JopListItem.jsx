import React from "react";
import "../../assets/css/JopListItem.css"

function JopListItem(props){
    return(
        <div className="main-jop-list">
            JopListItem
            {props.name}
        </div>
    )
}

export default JopListItem
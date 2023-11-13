import React from "react";

export default function Die(props) {
    return (
        <div className={props.isHeld === true ? "die held" : "die"} onClick={props.holdDice}>
            <h2 className="die-number">{props.value}</h2>
        </div>
    )
}
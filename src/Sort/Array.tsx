import React from "react";
import {useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";

interface ArrayProps {
    className: string
    num: number
}

export function Array(props: ArrayProps){
    const array = useSelector((state: SortState) => state.array)

    return (
        <div
            className={props.className}
            style={{ height: `${props.num/1.5}vh`, width:`${100}vh`}}>
            <div className={"number"}>{array.length <= 50 ? props.num : ""}</div>
        </div>
    )
}

import {isSortActive} from "../Utils";
import React from "react";
import {useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";

export function DrawArray(){
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const compare = useSelector((state: SortState) => state.compare)
    const sortedIndexes = useSelector((state: SortState) => state.sortedIndexes)

    return (
        <div className="array">
            {!isSortActive(isSorting) && array.map((num, index) => (
                <div
                    key={index}
                    className={"element"}
                    style={{ height: `${num/1.5}vh`, width:`${100}vh`}}>
                    <div className={"number"}>{array.length <= 50 ? num : ""}</div>
                </div>
            ))}

            {isSorting.insertionSort && array.map((num, index) => (
                <div
                    key={index}
                    className={`element 
                            ${compare.index === index ? "compare" : ""} 
                            ${sortedIndexes.includes(index) ? "sorted" : "" }`}
                    style={{ height: sortedIndexes.includes(index) ? `${compare.key/1.5}vh` :`${num/1.5}vh`, width:`${100}vh`}}>
                    <div className={"number"}>{array.length <= 50 ? sortedIndexes.includes(index) ? compare.key : num : ""}</div>
                </div>
            ))}

            {isSorting.mergeSort && array.map((num, index) => (
                <div
                    key={index}
                    className={`element ${sortedIndexes.includes(index) ? "sorted" : "" }`}
                    style={{ height: `${num/1.5}vh`, width:`${100}vh`}}>
                    <div className={"number"}>{array.length <= 50 ? num : ""}</div>
                </div>
            ))}

            {isSorting.selectionSort && array.map((num, index) => (
                <div
                    key={index}
                    className={`element 
                            ${compare.index === index ? "compare" : ""} 
                            ${sortedIndexes.includes(index) || compare.key === index ? "sorted" : "" }`}
                    style={{ height: `${num/1.5}vh`, width:`${100}vh`}}>
                    <div className={"number"}>{array.length <= 50 ? num : ""}</div>
                </div>
            ))}
        </div>
    )
}
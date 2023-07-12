import {isSortActive} from "../Utils";
import React from "react";
import {useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import {Array} from "./Array";

export function DrawArray(){
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const compare = useSelector((state: SortState) => state.compare)
    const sortedIndexes = useSelector((state: SortState) => state.sortedIndexes)

    return (
        <div>
            <div className="array">
                {!isSortActive(isSorting) && array.map((num, index) => (
                    <Array key={index} className={"element"} num={num}/>
                ))}

                {isSorting.insertionSort && array.map((num, index) => (
                    <div
                        key={index}
                        className={`element
                                ${compare.index === index ? "black" : ""}
                                ${sortedIndexes.includes(index) ? "green" : "" }`}
                        style={{ height: sortedIndexes.includes(index) ? `${compare.key/1.5}vh` : `${num/1.5}vh`, width:`${100}vh`}}>
                        <div className={"number"}>{array.length <= 50 ? sortedIndexes.includes(index) ? compare.key : num : ""}</div>
                    </div>
                ))}

                {isSorting.mergeSort && array.map((num, index) => (
                    <Array key={index}
                           className={`element ${sortedIndexes.includes(index) ? "green" : "" }`}
                           num={num}/>
                ))}

                {isSorting.selectionSort && array.map((num, index) => (
                    <Array key={index}
                            className={`element 
                                ${compare.index === index ? "black" : ""} 
                                ${sortedIndexes.includes(index) || compare.key === index ? "green" : "" }`}
                           num={num}/>
                ))}

                {isSorting.bubbleSort && array.map((num, index) => (
                    <Array key={index}
                           className={`element
                                ${compare.index === index ? "green" : compare.key === index ? "black" : ""} `}
                           num={num}/>
                ))}

                {isSorting.quickSort && array.map((num, index) => (
                    <Array key={index}
                           className={`element 
                                ${compare.index === index ? "black" : compare.key === index ? "orange" : ""} 
                                ${sortedIndexes.includes(index) ? "green" : "" }`}
                           num={num}/>
                ))}
            </div>
        </div>
    )
}

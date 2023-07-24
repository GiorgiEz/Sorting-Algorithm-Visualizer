import {isSortActive} from "../Utils";
import React from "react";
import {useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import {Array} from "./Array";

export function DrawArray(){
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const compare = useSelector((state: SortState) => state.compare)
    const sortedIndex = useSelector((state: SortState) => state.sortedIndex)

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
                                ${compare.val1 === index ? "black" : ""}
                                ${sortedIndex === index ? "green" : "" }`}
                        style={{ height: sortedIndex === index ? `${(compare.val2 as number)/1.5}vh` : `${num/1.5}vh`, width:`${100}vh`}}>
                        <div className={"number"}>{array.length <= 50 ? sortedIndex === index ? compare.val2 : num : ""}</div>
                    </div>
                ))}

                {isSorting.mergeSort && array.map((num, index) => (
                    <Array key={index}
                           className={`element ${(compare.val1 as number) === index || (compare.val2 as number) === index ? "green" : "" }`}
                           num={num}/>
                ))}

                {isSorting.selectionSort && array.map((num, index) => (
                    <Array key={index}
                            className={`element 
                                ${compare.val1 === index ? "black" : ""} 
                                ${sortedIndex === index || compare.val2 === index ? "green" : "" }`}
                           num={num}/>
                ))}

                {isSorting.bubbleSort && array.map((num, index) => (
                    <Array key={index}
                           className={`element
                                ${compare.val1 === index ? "green" : compare.val2 === index ? "black" : ""} `}
                           num={num}/>
                ))}

                {isSorting.quickSort && array.map((num, index) => (
                    <Array key={index}
                           className={`element 
                                ${compare.val1 === index ? "green" : compare.val2 === index ? "orange" : ""} 
                                ${sortedIndex === index ? "black" : "" }`}
                           num={num}/>
                ))}
            </div>
        </div>
    )
}

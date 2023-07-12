import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import "./sort.css"
import {generateNewArray, isSortActive} from "../Utils";
import {InsertionSort} from "../SortingAlgorithms/InsertionSort";
import {MergeSort} from "../SortingAlgorithms/MergeSort";
import {
    setArray, setArrayLength, setCompare, setIsSorting, setSortedIndexes
} from "../Redux/Actions";
import {SelectionSort} from "../SortingAlgorithms/SelectionSort";
import {DrawArray} from "./DrawArray";
import {BubbleSort} from "../SortingAlgorithms/BubbleSort";
import {QuickSort} from "../SortingAlgorithms/QuickSort";

export function Sort() {
    const dispatch = useDispatch()
    const isSorting = useSelector((state: SortState) => state.isSorting);
    const arrayLength = useSelector((state: SortState) => state.arrayLength);

    const pause = useRef(false)
    const endSorting = useRef(false)
    const sortingSpeed = useRef(50)

    const [pauseSort, setPauseSort] = useState(false)
    const [delay, setDelay] = useState(50)

    function handleRandomArray(){
        dispatch(setArray(generateNewArray(arrayLength)))
        dispatch(setIsSorting(
            {insertionSort: false, mergeSort: false, selectionSort: false, bubbleSort: false, quickSort: false}))
        dispatch(setCompare({index: -1, key: -1}))
        dispatch(setSortedIndexes([]))
        setPauseSort(false)
        pause.current = false
        endSorting.current = false
    }

    function handleDelaySpeed(e: React.ChangeEvent<HTMLInputElement>){
        sortingSpeed.current = parseFloat(e.target.value)
        setDelay(parseFloat(e.target.value))
    }

    function handleArrayLength(e: React.ChangeEvent<HTMLInputElement>){
        dispatch(setArrayLength(parseFloat(e.target.value)))
        dispatch(setArray(generateNewArray(parseFloat(e.target.value))))
        pause.current = false
        setPauseSort(false)
    }

    function handlePauseSort(){
        pause.current = !pause.current
        setPauseSort(!pauseSort)
    }

    function handleEndSort(){
        endSorting.current = true
        pause.current = false
        setPauseSort(false)
    }

    function stopSorting(): boolean{
        if (endSorting.current) {
            dispatch(setArray([]))
            return true
        }
        return false
    }

    return (
        <div>
            <div style={{display: "flex", marginBottom: "15px"}}>
                <InsertionSort pause={pause} endSorting={endSorting} sortingSpeed={sortingSpeed} stopSorting={stopSorting}/>
                <MergeSort pause={pause} endSorting={endSorting} sortingSpeed={sortingSpeed} delay={delay} stopSorting={stopSorting}/>
                <SelectionSort pause={pause} endSorting={endSorting} sortingSpeed={sortingSpeed} stopSorting={stopSorting}/>
                <BubbleSort pause={pause} endSorting={endSorting} sortingSpeed={sortingSpeed} stopSorting={stopSorting}/>
                <QuickSort pause={pause} endSorting={endSorting} sortingSpeed={sortingSpeed} delay={delay} stopSorting={stopSorting}/>
            </div>

            <div className={"random-end-pause-container"}>
                <button
                    className="random-end-pause"
                    disabled={isSortActive(isSorting) || pause.current}
                    onClick={handleRandomArray}>Random Array
                </button>

                <button
                    className={"random-end-pause"}
                    disabled={!isSortActive(isSorting)}
                    onClick={handlePauseSort}>
                    {pauseSort ? "Continue" : "Pause"} Sorting
                </button>

                <button
                    className={"random-end-pause"}
                    onClick={handleEndSort}
                    disabled={!isSortActive(isSorting)}>End Sorting
                </button>
            </div>

            <div className={"delay-arr-length"}>
                <label htmlFor="delay-speed">Sorting Speed: </label>
                <input
                    id="delay-speed"
                    type="range"
                    value={delay}
                    disabled={isSortActive(isSorting) && !pause.current}
                    onChange={handleDelaySpeed} />{`${sortingSpeed.current}ms`}
            </div>

            <div className={"delay-arr-length"}>
                <label htmlFor="array-length">Array Length: </label>
                <input
                    id="array-length"
                    type="range"
                    disabled={isSortActive(isSorting)}
                    value={arrayLength}
                    onChange={handleArrayLength}/>{`${arrayLength}`}
            </div>
            <DrawArray/>
        </div>
    )
}

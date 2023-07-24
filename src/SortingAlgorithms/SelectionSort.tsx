import {useDispatch, useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import {delay, isSortActive, isSorted} from "../Utils";
import {setCompare, setIsSorting, setSortedIndex} from "../Redux/Actions";
import {Props} from "../Types";
import React from "react";

export function SelectionSort(props: Props){
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)
    const isSorting = useSelector((state: SortState) => state.isSorting)

    function reset(isSelectionSortActive: boolean){
        dispatch(setIsSorting({...isSorting, selectionSort: isSelectionSortActive}))
        dispatch(setCompare({val1: -1, val2: -1}))
        dispatch(setSortedIndex(-1))
        props.endSorting.current = false
    }

    async function selectionSort() {
        reset(true)
        for (let i = 0; i < arrayLength; i++) {
            let min = i
            dispatch(setSortedIndex(min))

            for (let j = i + 1; j < arrayLength; j++) {
                if (props.stopSorting()) {reset(false); return}
                while (props.pause.current) {if (props.stopSorting()){reset(false); return} await delay(0);}

                if (array[min] > array[j]) {
                    min = j
                    dispatch(setSortedIndex(j))
                    dispatch(setCompare({val1: -1, val2: i}))
                    await delay(props.sortingSpeed.current)
                } else {
                    dispatch(setCompare({val1: j, val2: i}))
                }
                await delay(props.sortingSpeed.current)
            }
            [array[i], array[min]] = [array[min], array[i]];
            dispatch(setSortedIndex(-1))
        }
        reset(false)
    }

    return (
        <div>
            <button
                className="sort-array"
                disabled={isSortActive(isSorting) || arrayLength <= 0 || isSorted(array)}
                onClick={() => selectionSort()}>Selection Sort
            </button>
        </div>
    )
}

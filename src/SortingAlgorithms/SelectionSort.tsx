import {useDispatch, useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import {delay, isSortActive, isSorted} from "../Utils";
import {setCompare, setIsSorting, setSortedIndexes} from "../Redux/Actions";
import {Props} from "../Types";
import React from "react";

export function SelectionSort(props: Props){
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)
    const isSorting = useSelector((state: SortState) => state.isSorting)

    function reset(isSelectionSortActive: boolean){
        dispatch(setIsSorting({...isSorting, selectionSort: isSelectionSortActive}))
        dispatch(setCompare({key: -1, index: -1}))
        dispatch(setSortedIndexes([]))
        props.endSorting.current = false
    }

    async function selectionSort() {
        reset(true)
        for (let i = 0; i < arrayLength; i++) {
            let min = i
            dispatch(setSortedIndexes([min]))

            for (let j = i + 1; j < arrayLength; j++) {
                if (props.stopSorting()) {reset(false); return}
                while (props.pause.current) {if (props.stopSorting()){reset(false); return} await delay(0);}

                if (array[min] > array[j]) {
                    min = j
                    dispatch(setSortedIndexes([j]))
                    dispatch(setCompare({key: i, index: -1}))
                    await delay(props.sortingSpeed.current)
                } else {
                    dispatch(setCompare({key: i, index: j}))
                }
                await delay(props.sortingSpeed.current)
            }
            [array[i], array[min]] = [array[min], array[i]];
            dispatch(setSortedIndexes([]))
        }
        reset(false)
    }

    return (
        <div>
            <button
                className="sort-array"
                disabled={isSortActive(isSorting) || arrayLength<= 0 || isSorted(array)}
                onClick={() => selectionSort()}>Selection Sort
            </button>
        </div>
    )
}

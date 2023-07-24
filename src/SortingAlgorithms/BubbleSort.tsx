import {useDispatch, useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import {delay, isSortActive, isSorted} from "../Utils";
import React from "react";
import {Props} from "../Types";
import {setCompare, setIsSorting} from "../Redux/Actions";

export function BubbleSort(props: Props){
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)

    function reset(isBubbleSortActive: boolean){
        dispatch(setIsSorting({...isSorting, bubbleSort: isBubbleSortActive}));
        dispatch(setCompare({val1: -1, val2: -1}));
        props.endSorting.current = false
    }

    async function bubbleSort () {
        reset(true)
        for (let i = 0; i < arrayLength; i++) {
            let swapped = false
            for (let j = 0; j < arrayLength - i; j++) {
                if (props.stopSorting()) {reset(false); return}
                while (props.pause.current) {if (props.stopSorting()){reset(false); return} await delay(0);}

                dispatch(setCompare({val1: j+1, val2: j}))
                await delay(props.sortingSpeed.current)
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swapped = true
                    await delay(props.sortingSpeed.current)
                }
            }
            if (!swapped) break
        }
        reset(false)
    }

    return (
        <div>
            <button
                className="sort-array"
                disabled={isSortActive(isSorting) || arrayLength <= 0 || isSorted(array)}
                onClick={() => bubbleSort()}>
                Bubble Sort
            </button>
        </div>
    )
}

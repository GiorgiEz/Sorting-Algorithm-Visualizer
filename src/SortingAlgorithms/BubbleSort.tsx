import {useDispatch, useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import {delay, isSortActive, isSorted} from "../Utils";
import React from "react";
import {Props} from "../Types";
import {setCompare, setIsSorting, setSortedIndexes} from "../Redux/Actions";

export function BubbleSort(props: Props){
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)

    function reset(isBubbleSortActive: boolean){
        dispatch(setIsSorting({...isSorting, bubbleSort: isBubbleSortActive}));
        dispatch(setCompare({key: -1, index: -1}));
        dispatch(setSortedIndexes([]));
        props.endSorting.current = false
    }

    async function bubbleSort () {
        reset(true)
        const len = array.length;

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (props.stopSorting()) {reset(false); return}
                while (props.pause.current) {if (props.stopSorting()){reset(false); return} await delay(0);}

                dispatch(setCompare({index: j+1, key: j}))
                await delay(props.sortingSpeed.current)
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    await delay(props.sortingSpeed.current)
                }
            }
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

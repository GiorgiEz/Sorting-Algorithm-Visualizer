import {useDispatch, useSelector} from "react-redux";
import {setArray, setCompare, setIsSorting, setSortedIndexes} from "../Redux/Actions";
import {delay, isSorted} from "../Utils";
import {SortState} from "../Redux/redux-types";
import React from "react";
import {Props} from "../Types";
import {isSortActive} from "../Utils";

export function InsertionSort(props: Props) {
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)

    function reset(isInsertionSortActive: boolean){
        dispatch(setIsSorting({...isSorting, insertionSort: isInsertionSortActive}));
        dispatch(setCompare({key: -1, index: -1}));
        dispatch(setSortedIndexes([]));
        props.endSorting.current = false
    }

    function end_sorting(){
        if (props.endSorting.current) {
            reset(false)
            dispatch(setArray([]))
            return true
        }
        return false
    }

    async function insertionSort() {
        if (isSorted(array)) return;
        reset(true);

        for (let i = 0; i < arrayLength; i++) {
            let key = array[i];
            let j = i - 1;

            if (end_sorting()) return
            while (props.pause.current) {if (end_sorting()) return; await delay(0);}

            dispatch(setCompare({index: i, key: key}));
            dispatch(setSortedIndexes([j+1]));
            while (j >= 0 && key < array[j]) {
                if (end_sorting()) return
                while (props.pause.current) {if (end_sorting()) return; await delay(0);}
                await delay(props.sortingSpeed.current);

                array[j + 1] = array[j];
                dispatch(setSortedIndexes([j+1]));
                j -= 1;
            }
            array[j + 1] = key;
            dispatch(setSortedIndexes([j+1]));
            await delay(10 * props.sortingSpeed.current);
        }
        reset(false);
    }

    return (
        <div>
            <button
                className="sort-array"
                disabled={isSortActive(isSorting) || arrayLength <= 0 || isSorted(array)}
                onClick={() => insertionSort()}>
                Insertion Sort
            </button>
        </div>
    )
}

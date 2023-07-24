import {useDispatch, useSelector} from "react-redux";
import {setCompare, setIsSorting, setSortedIndex} from "../Redux/Actions";
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
        dispatch(setCompare({val1: -1, val2: -1}));
        dispatch(setSortedIndex(-1));
        props.endSorting.current = false
    }

    async function insertionSort() {
        reset(true);

        for (let i = 0; i < arrayLength; i++) {
            let key = array[i];
            let j = i - 1;

            if (props.stopSorting()) {reset(false); return}
            while (props.pause.current) {if (props.stopSorting()){reset(false); return} await delay(0);}

            dispatch(setCompare({val1: i, val2: key}));
            dispatch(setSortedIndex(j+1));
            while (j >= 0 && key < array[j]) {
                if (props.stopSorting()) {reset(false); return}
                while (props.pause.current) {if (props.stopSorting()){reset(false); return} await delay(0);}
                await delay(props.sortingSpeed.current);

                array[j + 1] = array[j];
                dispatch(setSortedIndex(j+1));
                j -= 1;
            }
            array[j + 1] = key;
            dispatch(setSortedIndex(j+1));
            await delay(props.sortingSpeed.current);
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

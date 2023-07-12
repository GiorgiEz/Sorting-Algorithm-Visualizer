import {delay, isSortActive, isSorted} from "../Utils";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import {Props} from "../Types";
import {setCompare, setIsSorting, setSortedIndexes} from "../Redux/Actions";

interface QuickSortProps extends Props{
    delay: number,
}

export function QuickSort(props: QuickSortProps){
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)

    function reset(isQuickSortActive: boolean){
        dispatch(setIsSorting({...isSorting, quickSort: isQuickSortActive}));
        dispatch(setCompare({key: -1, index: -1}));
        dispatch(setSortedIndexes([]));
        props.endSorting.current = false
    }

    function end_sorting(){
        if (props.stopSorting()) {
            reset(false);
            props.sortingSpeed.current = 0
            return true
        }
        return false
    }

    async function partition(arr: number[], start: number, end: number) {
        const pivotIndex = end;
        const pivot = arr[end];
        let leftIndex = start;
        dispatch(setSortedIndexes([pivotIndex]))

        for (let i = start; i <= end; i++) {
            if (end_sorting()) return
            while (props.pause.current) {
                if (end_sorting()) return;
                await delay(0);
            }

            dispatch(setCompare({index: i, key: leftIndex}))
            await delay(props.sortingSpeed.current)
            if (arr[i] < pivot) {
                [arr[i], arr[leftIndex]] = [arr[leftIndex], arr[i]];
                leftIndex += 1;
            }
        }
        [arr[pivotIndex], arr[leftIndex]] = [arr[leftIndex], arr[pivotIndex]];
        await delay(props.sortingSpeed.current)
        return leftIndex;
    }

    async function quickSortAux(arr: number[], start: number, end: number) {
        if (start < end) {
            const p = await partition(arr, start, end);
            await quickSortAux(arr, start, (p as number) - 1);
            await quickSortAux(arr, (p as number) + 1, end);
        }
    }

    async function quickSort() {
        reset(true)
        await quickSortAux(array, 0, arrayLength - 1)
            .finally(() => {
                reset(false)
                props.sortingSpeed.current = props.delay
            })
    }

    return (
        <div>
            <button
                className="sort-array"
                disabled={isSortActive(isSorting) || arrayLength <= 0 || isSorted(array)}
                onClick={() => quickSort()}>
                Quick Sort
            </button>
        </div>
    )
}

import {delay, isSortActive, isSorted} from "../Utils";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {SortState} from "../Redux/redux-types";
import {Props, StackType} from "../Types";
import {setCompare, setIsSorting, setSortedIndex} from "../Redux/Actions";

export function QuickSort(props: Props){
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)

    function reset(isQuickSortActive: boolean){
        dispatch(setIsSorting({...isSorting, quickSort: isQuickSortActive}));
        dispatch(setCompare({val1: -1, val2: -1}));
        dispatch(setSortedIndex(-1));
        props.endSorting.current = false
    }

    async function partition(arr: number[], start: number, end: number) {
        const pivotIndex = end;
        const pivot = arr[end];
        let leftIndex = start;
        dispatch(setSortedIndex(pivotIndex));

        for (let i = start; i <= end; i++) {
            if (props.stopSorting()) return
            while (props.pause.current) {if (props.stopSorting()) return; await delay(0);}

            dispatch(setCompare({ val1: i, val2: leftIndex }));
            await delay(props.sortingSpeed.current);
            if (arr[i] < pivot) {
                [arr[i], arr[leftIndex]] = [arr[leftIndex], arr[i]];
                leftIndex += 1;
            }
        }
        [arr[pivotIndex], arr[leftIndex]] = [arr[leftIndex], arr[pivotIndex]];
        await delay(props.sortingSpeed.current);
        return leftIndex;
    }

    async function quickSort() {
        reset(true);

        const stack: { start: number; end: number }[] = []; // Stack to store ranges
        stack.push({ start: 0, end: arrayLength - 1 });

        while (stack.length) {
            if (props.stopSorting()) break
            while (props.pause.current) {if (props.stopSorting()) break; await delay(0);}

            const popped = stack.pop()
            const p = await partition(array, (popped as StackType).start, (popped as StackType).end);
            if ((p as number) - 1 > (popped as StackType).start) {
                stack.push({ start: (popped as StackType).start, end: (p as number) - 1 });
            }
            if ((p as number) + 1 < (popped as StackType).end) {
                stack.push({ start: (p as number) + 1, end: (popped as StackType).end });
            }
        }
        reset(false);
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

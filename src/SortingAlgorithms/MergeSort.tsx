import {SortState} from "../Redux/redux-types";
import {delay, isSortActive, isSorted} from "../Utils";
import {setCompare, setIsSorting} from "../Redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import {Props} from "../Types";

export function MergeSort(props: Props) {
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)

    function reset(isMergeSortActive: boolean){
        dispatch(setIsSorting({...isSorting, mergeSort: isMergeSortActive}))
        dispatch(setCompare({val1: -1, val2: -1}))
        props.endSorting.current = false
    }

    async function mergeSort() {
        reset(true);

        const start = 0
        const end = arrayLength - 1
        for (let size = 1; size <= end - start; size *= 2) {
            for (let leftStart = start; leftStart < end; leftStart += 2 * size) {
                if (props.stopSorting()) break;
                while (props.pause.current) {if (props.stopSorting()) break; await delay(0);}

                const mid = Math.min(leftStart + size - 1, end);
                const rightStart = Math.min(leftStart + 2 * size - 1, end);
                await mergeArray(leftStart, mid, rightStart);
            }
            if (props.stopSorting()) break;
            while (props.pause.current) {if (props.stopSorting()) break; await delay(0);}
        }
        reset(false);
    }

    let itmd: number[] = [];
    async function mergeArray(start: number, mid: number, end: number) {
        let start1 = start, start2 = mid + 1;
        let index = start;

        if (props.stopSorting()) return;
        while (props.pause.current) {if (props.stopSorting()) return; await delay(0);}

        while (start1 <= mid && start2 <= end) {
            if (props.stopSorting()) return;
            while (props.pause.current) {if (props.stopSorting()) return; await delay(0);}

            if (array[start1] <= array[start2]) {
                itmd[index] = array[start1];
                index = index + 1;
                start1 = start1 + 1;
            } else {
                itmd[index] = array[start2];
                index = index + 1;
                start2 = start2 + 1;
            }
            dispatch(setCompare({ val1: start1, val2: start2 }));
            await delay(props.sortingSpeed.current);
        }

        while (start1 <= mid) {
            if (props.stopSorting()) return;
            while (props.pause.current) {if (props.stopSorting()) return; await delay(0);}

            itmd[index] = array[start1];
            index = index + 1;
            start1 = start1 + 1;

            dispatch(setCompare({ val1: start1, val2: start2 }));
            await delay(props.sortingSpeed.current);
        }

        while (start2 <= end) {
            if (props.stopSorting()) return;
            while (props.pause.current) {if (props.stopSorting()) return; await delay(0);}

            itmd[index] = array[start2];
            index = index + 1;
            start2 = start2 + 1;

            dispatch(setCompare({ val1: start1, val2: start2 }));
            await delay(props.sortingSpeed.current);
        }

        index = start;
        while (index <= end) {
            if (props.stopSorting()) return;
            while (props.pause.current) {if (props.stopSorting()) return; await delay(0);}

            array[index] = itmd[index];
            index++;

            dispatch(setCompare({ val1: -1, val2: -1 }));
            await delay(props.sortingSpeed.current);
        }
    }

    return (
        <div>
            <button
                className="sort-array"
                disabled={isSortActive(isSorting) || arrayLength <= 0 || isSorted(array)}
                onClick={() => mergeSort()}>
                Merge Sort
            </button>
        </div>
    )
}

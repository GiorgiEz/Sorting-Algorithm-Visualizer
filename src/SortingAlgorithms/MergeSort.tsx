import {SortState} from "../Redux/redux-types";
import {delay, isSortActive, isSorted} from "../Utils";
import {setCompare, setIsSorting, setSortedIndexes} from "../Redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import {Props} from "../Types";

interface MergeSortProps extends Props{
    delay: number
}

export function MergeSort(props: MergeSortProps) {
    const dispatch = useDispatch()
    const array = useSelector((state: SortState) => state.array)
    const isSorting = useSelector((state: SortState) => state.isSorting)
    const arrayLength = useSelector((state: SortState) => state.arrayLength)

    function reset(isMergeSortActive: boolean){
        dispatch(setIsSorting({...isSorting, mergeSort: isMergeSortActive}))
        dispatch(setCompare({key: -1, index: -1}))
        dispatch(setSortedIndexes([]))
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

    function animate(start: number, end: number){
        if (end_sorting()) return
        const newSortedIndexes = []
        for (let i = start; i <= end; i++) {
            newSortedIndexes.push(i);
        }
        dispatch(setSortedIndexes([...newSortedIndexes]));
    }

    async function mergeSort(start: number, end: number) {
        if (start >= end || end_sorting()) return

        let mid = (start + end) >> 1
        await mergeSort(start, mid)
        await mergeSort(mid + 1, end)
        await mergeArray(start, end)
        animate(start, end)

        await delay(props.sortingSpeed.current)
    }

    let itmd: number[] = []
    async function mergeArray(start: number, end: number) {
        if (end_sorting()) return
        while (props.pause.current) {if (end_sorting()) return; await delay(0);}

        let mid = (start + end) >> 1
        let start1 = start, start2 = mid + 1
        let end1 = mid, end2 = end
        let index = start

        while (start1 <= end1 && start2 <= end2) {
            if (array[start1] <= array[start2]) {
                itmd[index] = array[start1]
                index = index + 1
                start1 = start1 + 1;
            }
            else if(array[start1] > array[start2]) {
                itmd[index] = array[start2]
                index = index + 1
                start2 = start2 + 1;
            }
        }

        while (start1 <= end1) {
            itmd[index] = array[start1]
            index = index + 1
            start1 = start1 + 1;
        }

        while (start2 <= end2) {
            itmd[index] = array[start2]
            index = index + 1
            start2 = start2 + 1;
        }

        index = start
        while (index <= end) {
            array[index] = itmd[index];
            index++;
        }
    }

    function mergeSortHandler(){
        reset(true);
        mergeSort(0, arrayLength-1)
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
                onClick={mergeSortHandler}>
                Merge Sort
            </button>
        </div>
    )
}

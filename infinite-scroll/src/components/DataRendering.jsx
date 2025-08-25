import React, { useRef, useState } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { mockFakeData } from '../lib/utils/helper';


const DataRendering = () => {
    const [data, setData] = useState(mockFakeData(0, 20));
    const [loading, setLoading] = useState(false);
    const [renderAll, setRenderAll] = useState(false);
    const loaderRef = useRef(null)


    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            const newData = mockFakeData(data.length, 20);
            if (newData.length === 0) {
                setRenderAll(true);
            }
            setData((prev) => [...prev, ...newData]);
            setLoading(false);
        }, 300);
    };


    useInfiniteScroll({ loading, renderAll, loaderRef, loadMore });

    return (
        <div>
            <ul role="list" aria-label="Scrollable list">
                {data.map((item) => (
                    <li key={item} role="listitem" className='list-item' tabIndex={0}>
                        {item}
                    </li>
                ))}
            </ul>

            <p aria-live="polite">
                {loading && "Loading more items..."}
                {renderAll && "All items have been rendered."}
            </p>

            <div style={{ height: "5px" }} ref={loaderRef}></div>
        </div>
    )
}

export default DataRendering

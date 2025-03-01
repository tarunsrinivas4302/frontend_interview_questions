import React from 'react'
import { useState } from 'react'
import DataRender from './data-render';

const Pagination = ({ maxPageLength = 10, data }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const totalDataLength = data.length;

    const totalPages = Math.ceil(totalDataLength / maxPageLength);
    const limit = currentPage * maxPageLength;
    const offset = (currentPage - 1) * maxPageLength;


    const pagesArray = [...Array(totalPages)].map((_, i) => i + 1);

    const handleClick = (page) => {
        setCurrentPage(page);
    }
    return (
        <div>
            <h2>Current Page: {currentPage}</h2>
            <DataRender data={data} limit={limit} offset={offset} />
            <div className="pagination">
                {pagesArray.map((item) => (
                    <button className="pagination-item" key={item} onClick={() => handleClick(item)}>{item}</button>
                ))}
            </div>
        </div>
    )
}

export default Pagination

import React from 'react'


const DataRender = ({ data, limit, offset }) => {
    return (
        <div>
            {
                data.slice(offset, limit).map((item) => {
                    return (
                        <p key={item.email}>{item.email}</p>
                    )
                })
            }
        </div>
    )
}

export default DataRender

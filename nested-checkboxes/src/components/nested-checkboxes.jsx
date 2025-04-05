import React from 'react'

const CheckBoxes = ({ item, onChange }) => {
    return (

        <div>
            <input type="checkbox"
                id={item.id}
                ref={(el) => { if (el) el.indeterminate = item.indeterminate || false }}
                checked={item.isChecked}
                onChange={() => onChange(item.id)}
            />
            <label htmlFor={item.id}>{item.category || item.name}</label>
            {
                item.children && item.children.length > 0 && item.children.map((child) => (
                    <div style={{ paddingLeft: '20px' }}>
                        <CheckBoxes item={child} key={child.id} onChange={onChange} />
                    </div>
                ))
            }
        </div>

    )
}

export default CheckBoxes

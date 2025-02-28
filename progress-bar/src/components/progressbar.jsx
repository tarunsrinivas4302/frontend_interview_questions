import React from 'react'

const ProgressBar = ({percentage = 10}) => {
  return (
    <div className='progress-bar'>
        <div className="progress" style={{
            transform : `translateX(${percentage - 100}%)`
        }}>
        <span className="percentage" style={{
            color : `${percentage > 40 ? "white" : "black"}`
        }}>{percentage}%</span>

        </div>

    </div>
  )
}

export default ProgressBar

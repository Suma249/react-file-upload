import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ percentage }) => {
    return (
        <div className='progress-bar progress-bar-striped bg-success' role='progressbar' style={{ width: `${percentage}` }}>
            {percentage}%
        </div>
    )
}

Progress.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default Progress
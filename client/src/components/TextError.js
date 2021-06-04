import React from 'react'

function TextError(props) {
    return (
        <small style={{ color: 'yellow' }} className="text-left d-block">
            {props.children}
        </small>
    )
}

export default TextError

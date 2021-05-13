import React from 'react'

const Toast = ({ msg, handleShow, bgColor }) => {
    return (
        <div
            style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}
            className={`toast show position-fixed text-light ${bgColor}`}
        >
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="mr-auto text-light">{msg.title}</strong>
                <button
                    className="mb-1 ml-2 close text-light"
                    data-dismiss="toast" style={{ outline: 'none' }}
                    onClick={handleShow}
                >
                    &times;
                </button>
            </div>
            <div className="toast-body">
                {msg.body}
            </div>
        </div>
    )
}

export default Toast

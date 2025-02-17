import React from 'react'
export default function Modal({buttonAction, children, onClose}) {
    
    
    return (
        <div className="modal"> 
            <div className='modalContent'>
                {children}
                <button onClick={onClose}>{buttonAction}</button>
            </div>
        </div>
    )
}
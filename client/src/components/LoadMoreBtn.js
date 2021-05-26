import React from 'react'
import { ITEM_PER_PAGE } from '../utils/config'

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
    return (
        <>
            {
                result < ITEM_PER_PAGE * (page - 1) ? '' :
                    !load && <button className="mx-auto btn btn-dark d-block" onClick={handleLoadMore}>
                        Load more
                    </button>
            }
        </>
    )
}

export default LoadMoreBtn

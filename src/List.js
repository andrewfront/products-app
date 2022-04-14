import React from 'react'

const List = ({items, editItem, removeItem}) => {
  return (
    <div className="products__list">
        {items.map((item) => {
            const {id, title} = item
            return (
                <article key={id} className="products__item">
                    <p className="products__info">{title}</p>
                    <div className="products__btn-container">
                        <button type='button' className='products__edit' onClick={() => editItem(id)}><i className='fa-solid fa-file-pen'></i></button>
                        <button type='button' className='products__delete'><i className='fa-solid fa-trash-can' onClick={() => removeItem(id)}></i></button>
                    </div>
                </article>
            )
        })}
    </div>
  )
}

export default List
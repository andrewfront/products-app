import React, { useEffect, useState } from 'react'
import Alert from './Alert'
import List from './List'
const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}
function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({show: false, msg: '', type: ''})
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'plaese enter product', 'products__danger')
    }
    else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editID) {
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'product edited', 'products__added')
    }
    else {
      showAlert(true, 'product added', 'products__added')
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItem])
      setName('')
    }
  }
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({show, msg, type})
  }
  const clearList = () => {
    showAlert(true, 'list cleared', 'products__empty')
    setList([])
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
  const removeItem = (id) => {
    showAlert(true, 'product removed', 'products__danger')
    setList(list.filter((item) => item.id !== id))
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
<div className="products">
  <h1 className="products__title">Save your products</h1>
  <p className="products__copyright">made and designed by | andrew
  <span><i className='fa-solid fa-face-grin-beam'></i></span>
  </p>
  <div className="container">
    <div className="products__inner">
      <form className='products__form' onSubmit={handleSubmit}>
{alert.show && <Alert {...alert} removeAlert={showAlert} list={list}></Alert>}
<h2 className="products__status">Add you products</h2>
<div className="products__value">
  <input type="text" className='products__input' placeholder='add you products' value={name} onChange={(e) => setName(e.target.value)}/>
  <button type='submit' className='products__submit'>{isEditing ? 'edit' : 'submit'}</button>
</div>
      </form>
      {list.length > 0 && (
<div className="products__container">
    <List items={list} editItem={editItem} removeItem={removeItem}></List>
</div>
      )}
<div className='products__btn-clear__container'>
      <button type='button' className='products__clear' onClick={clearList}>clear items</button>
</div>
    </div>
  </div>
</div>
  );
}

export default App;

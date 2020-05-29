import React from 'react';

const DeleteItem = ({item, deleteItem, updateItem}) => {
    return(
        <>
        <button onClick={() => updateItem(item)}>Edit Item</button>
        <br></br>
        <button onClick={() => deleteItem(item._id)}>Delete Item</button>
        </>
    )
}

export default DeleteItem;
import React from 'react';

const DeleteItem = ({item, deleteItem, updateItem}) => {
    return(
        <>
        <button onClick={() => updateItem(item)}>Edit Item</button>
        <br></br>
        <button onClick={() => deleteItem(item._id)}>Deactivate</button>
        </>
    )
}

export default DeleteItem;
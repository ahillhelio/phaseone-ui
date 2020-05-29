import React, { Component } from 'react';
import ItemForm from './itemform';
import UpdateItem from './updateitem';
import DeleteItem from './deleteitem';

class Item extends Component {
    constructor(props){
        super(props);
        this.state ={
            item : [
              
            ],
            isCreate : true,
            isToggleOn : true,
            displayItems : []
        }
        this.showActivity = this.showActivity.bind(this);

    }

    getItem = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/items`) 
        .then(response => response.json())
        .then(data => this.setState( {item : data, displayItems : data, isCreate: true } ));
    };

    sortQuantity () {
        const arrayToSort = Object.assign([], this.state.item)
        arrayToSort.sort((a,b) => {
            return a.quantity-b.quantity;
        })
        this.setState ({displayItems : arrayToSort})
    }

    showActivity () {
        const itemsActive = this.state.item.filter(item => item.isActive === this.state.isToggleOn);
        // const renderActive = itemsActive.map ((item) => <li key={item.name}>{item.name}</li>)
        this.setState ({displayItems : itemsActive, isToggleOn : !this.state.isToggleOn})
    }

    // showActivity () {
    //     const arrayToFilter = Object.assign([], this.state.item)
    //     arrayToFilter.filter((a,b) => {
    //         return a.isActive-b.isActive;
    //     })
    //     this.setState ({item : arrayToFilter})
    // }

    deleteItem = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/items/${id}`, {
            method: 'DELETE'
        }) 
        .then(response => response.json())
        .then(console.log)
        .then(this.getItem);
    };

    updateItem = (item) => {
        this.setState({
            updateItem: item,
            isCreate: false,
        })
    };

    renderForm = () => {
        let result;
        if (this.state.isCreate) {
            result = (<ItemForm key="createForm" refresh={this.getItem} />);
        } else {
            const data = this.state.updateItem; 
            result = <UpdateItem key={data._id} item={data} refresh={this.getItem}/>;
        }
        return result; 
    }

    componentDidMount (){ 
        this.getItem();
    }



    render(){ 
        const displayItem = this.state.displayItems.map((item) => {
            
            return <div> 
                        {item.name}/
                        {item.description}/
                        Qty:  {item.quantity}/ 
                        {item.isActive ? 'Active': 'Not Active'}
                        
                    <br></br>
                    
                        <DeleteItem item={item} 
                        deleteItem={this.deleteItem}
                        updateItem={this.updateItem}
                        />
                        
                  </div>       
        })

        console.log(this.state.item);

        return (
            <>
            <h3>MY CART</h3>
            {this.renderForm()}
            {displayItem}
            <br></br>
            <button onClick={() => this.sortQuantity()}>Sort by Quantity</button>
            <br></br>
            <button onClick={this.showActivity}>
            {this.state.isToggleOn ? 'Show Active' : 'Show Inactive'}
            </button>
            </>
        )

    }

    
};

export default Item;
import React from 'react';

class ItemForm extends React.Component{
    state = {
        name: "",
        description: "",
        quantity: 0,
        isActive: true
    }

    handleChange = ( {target} ) => {
        const key = target.name; 
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isActive= this.state.isActive === true;
        fetch(`${process.env.REACT_APP_API_URL}/api/items`, {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify([
                {name : this.state.name, 
                 description : this.state.description, 
                 quantity : parseInt(this.state.quantity), 
                 isActive : isActive}
            ])
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            name: "",
            description: "",
            quantity: 0, 
            isActive: true
        })); 
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}> 
                <input 
                    name="name" 
                    type="text"
                    value={this.state.name}
                    placeholder= "Name of Product"
                    onChange={this.handleChange}/>
                <input 
                    name="description" 
                    type="text"
                    value={this.state.description}
                    placeholder= "Product Description"
                    onChange={this.handleChange}/>
                <input
                    name="quantity"
                    type= "number"
                    value={this.state.quantity}
                    placeholder= "Quantity"
                    onChange={this.handleChange}/>
                <select
                    name="isActive"
                    value={this.state.isActive}
                    onChange={this.handleChange}>
                    <option value={true}>Active</option>
                    <option value={false}>Not Active</option>
                    
                </select>

                <input type="submit" value="Add Product to Inventory"/>
            </form>
        )
    }
}

export default ItemForm; 
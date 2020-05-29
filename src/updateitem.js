import React from 'react';

class UpdateItem extends React.Component {
    state = {
        name: this.props.item.name, 
        description: this.props.item.description,
        quantity: this.props.item.quantity,
        isActive: this.props.item.isActive
    }

    handleChange = ( {target} ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (item) => {
        item.preventDefault();
        const isActive= this.state.isActive === "true";
        fetch(`${process.env.REACT_APP_API_URL}/api/items/${this.props.item._id}`, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name : this.state.name, 
                description : this.state.description, 
                quantity : this.state.quantity, 
                isActive : isActive
            })
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            name: "",
            description: "",
            quantity: 0,
            isActive: ""
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
                    placeholder= "Product Quantity"
                    onChange={this.handleChange}/>
                <select
                    name="isActive"
                    value={this.state.isActive}
                    onChange={this.handleChange}>
                    <option value={true}>Active</option>
                    <option value={false}>Not Active</option>
                    
                </select>

                <input type="submit" value="Edit or Update Product"/>
                <input type="button" value="Cancel" onClick={this.props.refresh}/>
            </form>
        )
    }
}

export default UpdateItem; 
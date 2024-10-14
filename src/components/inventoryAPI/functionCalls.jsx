import React from 'react';
import axios from 'axios';

// export function useGetAll() {

//     const [items, setItems] = React.useState([]);

//     React.useEffect(() => {
//         // Fetch items from your API
//         axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items')
//             .then(response => {
//                 setItems(response.data); // Assuming response.data is an array of items
//                 // console.log(response.data); // Assuming response.data is an array of items
//             })
//             .catch(error => console.error('Error fetching items:', error));
//     }, []);

//     return items;
// }

export function updateItem(payload) {
    console.log("payload=", payload);
    const url = `https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items/${payload.itemName}`;

    console.log("update function call");
    axios.put(url, payload)
        .then(response => {
            console.log('Item updated successfully:', response.data);
        })
        .catch(error => {
            console.error('Error updating item:', error);
        });
}

export function deleteItem(item) {

    console.log("delete function call");
    axios.delete(`https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items/${item.itemName}`)
        .then(response => {
            console.log('Item deleted successfully:', response.data);
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
}

export function addItem(payload) {
    console.log("add item function call");
    console.log("payload=", JSON.stringify(payload));
    
    const url = 'https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items';

    axios.post(url, payload)
    .then(response => {
        console.log('Item added successfully:', response.data);
    })
    .catch(error => {
        console.error('Error adding item:', error);
    });

}
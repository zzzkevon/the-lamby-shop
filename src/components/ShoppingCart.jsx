import React, {useState} from 'react';
import img1 from "../images/img1.jpeg";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

function ItemCard({ id, name, onDelete }){

  let itemName = ["strawberry bunny beanie"];
  let size = ["small","medium","large","extra large"];
  let price = [40.00,20.00];
  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if(count>1){
      setCount(count - 1);
    }   
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className='flex itemCard1 my-3 justify-between bg-white p-3 rounded-[22px] '>
      <img src={img1} alt="item image" class="w-1/5 h-full object-cover p-4 rounded-[22px]" />
      <div class='relative w-4/5'>
        <p>{itemName}</p>
        <p>size: {size[3]}</p>
        <div class="absolute bottom-0 left-0">${price[0].toFixed(2)}</div>
        <button class="absolute top-0 right-2 hover:underline" onClick={handleDelete}>X</button>
        <div class="flex justify-between absolute bottom-0 right-2 font-sans text-2xl">
          <button class='mx-2 text-3xl border hover:border-blue-500' onClick={decrementCount}><FiMinus /></button>
          <div class='mx-2'>{count}</div>
          <button class='mx-2 text-3xl border hover:border-blue-500' onClick={incrementCount}><IoMdAdd /></button>
        </div>
      </div>
    </div>
  );
}

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const addItem = () => {
    setItems([...items, { id: items.length + 1, name: `Item ${items.length + 1}` }]);
  };
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  const[subtotal, setSubtotal] = useState(60.00);
  const updateSubtotal = () => {
    // Example of updating the number
    setSubtotal(75.50);
  };

  return (
    <div className="main-bg just-another-hand text-3xl min-w-full">
      <div className ='mx-auto w-4/5 rounded-lg'>
        <div className='px-2 font-normal text-5xl text-[#780000]'>Shopping Cart</div>
        <div className='flex w-full justify-between'>
          <div className='itemCards w-4/5 rounded-lg mr-4'>
            <div class='justify-center' style={{ display: items.length === 0 ? "flex" : "none" }}>
              <h1>Your Cart is&nbsp;<b class='text-red-500'>Empty!&nbsp;</b></h1>
              <h2>Must add items on the cart before you proceed to checkout.</h2>
            </div>          
            {items.map((item) => (
            <ItemCard key={item.id} id={item.id} onDelete={deleteItem}/>
            ))}
          </div>
          <div className='checkoutPane w-1/5 rounded-lg text-center ml-4'>
            <div className='bg-white rounded-[22px] border p-3 my-3'>subtotal: ${subtotal.toFixed(2)}</div>
            <button className='w-full bg-[#780000] text-white rounded-full text-4xl hover:underline my-3'>Check Out</button>
            <button className='bg-lime-500' onClick={addItem}>Testing Button: Add Item</button>
          </div>
        </div>
      </div>
      <div className='w-full h-10'></div>
    </div>
  );
}

export default ShoppingCart;
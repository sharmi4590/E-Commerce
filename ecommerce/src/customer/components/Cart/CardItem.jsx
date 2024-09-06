import React from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, IconButton } from "@mui/material";
//import { AddCircleOutline } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";


const CardItem = ({item}) => {
  //console.log("item",item)
const dispatch=useDispatch();
  const handleUpdateCartItem=(num)=>{
    //console.log("hello",num,item.quantity,item._id)
    const data={data:{quantity:item.quantity+num},cartItemId:item?._id}
    console.log("data",item.quantity+num)
    dispatch(updateCartItem(data))
  }
  const handleRemoveCardItem=()=>{
    dispatch(removeCartItem(item._id))
  }
  
  return (
    
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg-w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item.product.imageUrl}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product.title}</p>
          <p className="opacity-70">Size: {item.size},{item.product.color}</p>
          <p className="opacity70 mt-2">Seller: {item.product.brand}</p>

          <div className="flex space-x-2 items-center  text-gray-900 pt- 6">
            <p className="font-semibold">₹{item.price}</p>
            <p className="opacity-50 line-through"> ₹{item.descountedPrice}</p>
            <p className="text-green-600 font-semibold">{item.discountPersent}% off</p>
          </div>
        </div>
        
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
            <div className="flex items-center space-x-2">
                <IconButton onClick={()=>handleUpdateCartItem(-1) } disable={item.quantity<=1}  sx={{color:"RGB(145 85 253)"}}>
<RemoveCircleOutlineIcon/>

                </IconButton>
                <span className="py-1 px-7 border rounded-sm">{item.quantity}</span>
                <IconButton onClick={()=>handleUpdateCartItem(1)} sx={{color:"RGB(145 85 253)"}}>
<AddCircleOutlineIcon/>

                </IconButton>
                
            </div>
<div>
    <Button onClick={handleRemoveCardItem} sx={{color:"RGB(145 85 253)"}}>Remove</Button>
</div>
        </div>
    </div>
  );
};

export default CardItem;

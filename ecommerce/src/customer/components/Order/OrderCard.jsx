import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = () => {
    const navigate=useNavigate();

  return (
    <div onClick={()=>navigate(`/account/order/${5}`)} className='p-5 shadow-md hover:shadow-2xl border'>
        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
            <Grid item sx={6} >
                <div className='flex cursor-pointer'>
                    <img className='w-[5rem] h-[5rem] object-cover object-top' src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQQTTybfPUf2lQfugak9QbrE84nndrlgGcj-MYTwNoCw-9Z2iZvw6HBfOdir9YFzqlvSxY6zYO1ojQUL0NtKNsX5vHQ6qSS2ZfonuTlWWwH5K8PW15FRPrL" alt="" />
                

                <div className="ml-5 space-y-2">
                    <p className=''>Men Slim and Jeans</p>
                    <p className='opacity-50 text-xs font-semibold'>Size: M</p>
                    <p className='opacity-50 text-xs font-semibold'>Color: Black</p>
                    </div>
                
                </div>

            </Grid>
            <Grid item xs={2}>
<p>rs123</p>

            </Grid>
            <Grid item xs={4}>
            {true && <div>
                <p>
                <AdjustIcon sx={{width:"15px", height:"15px"}} className='text-green-600 mr-2 text-sm'/><span>
                    Delivered on March 03
                    </span>
                    </p>
                    <p className='text-xs'>
                        Your Item has been Delivered
                    </p>
                    </div> }
                    {false && <p>
                        <span>Expected Delivery on march 03</span>
                    </p>}
                    
            </Grid>

        </Grid>
    </div>
  )
}

export default OrderCard
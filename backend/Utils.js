import dotenv from "dotenv"
dotenv.config();


const PAYPAL_BASE_URL="https://api-m.sandbox.paypal.com";

const getAccessToken=async()=>{
    const auth=Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response=await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`,{
        method:"POST",
        headers:{
            Authorization:`Basic ${auth}`,
            "Content-Type":"application/x-www-form-urlencoded",
        },
        body:"grant_type=client_credentials"
    });

    const data=await response.json();
    if(!data.access_token){
        console.error("PayPal token error: ",data);
        throw new Error("Failed to get PayPal access token");
    }
    return data.access_token;
}

export const createPayPalOrder=async(amount)=>{
    const accessToken=await getAccessToken();

    const response=await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            intent:"CAPTURE",
            purchase_units:[
                {
                    amount:{
                        currency_code:"USD",
                        value:Number(amount).toFixed(2)
                    }
                }
            ]
        })
    })

    const data=await response.json();
    if(!data.id){
        console.error("PayPal create order failed:",data);
        throw new Error("PayPal order creation failed");
    }
    return data;
}

export const capturePayPalOrder=async(orderId)=>{
    const accessToken=await getAccessToken();

    const response=await fetch(
        `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
        {
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json"
            }
        }
    );
    const data=await response.json();

    if(data.status!=="COMPLETED"){
        console.error("Paypal capture failed : ",data);
        throw new Error("PayPal payment not completed");
    }

    return data;
}
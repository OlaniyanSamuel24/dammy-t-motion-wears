const paystackBaseUrl='https://api.paystack.co';

function secretKey(){const key=process.env.PAYSTACK_SECRET_KEY;if(!key)throw new Error('Paystack secret key is not configured');return key}

export async function paystackRequest<T>(path:string,init:RequestInit={}){const response=await fetch(`${paystackBaseUrl}${path}`,{...init,headers:{Authorization:`Bearer ${secretKey()}`,'Content-Type':'application/json',...(init.headers||{})},cache:'no-store'});const data=await response.json() as T & {message?:string};if(!response.ok||('status' in data&&data.status===false))throw new Error(data.message||'Paystack request failed');return data}

export type PaystackTransaction={status:boolean;message:string;data:{id:number;status:'success'|'failed'|'abandoned';reference:string;amount:number;currency:string;channel?:string;paid_at?:string}};
export async function initializePaystackTransaction(input:{email:string;amount:number;reference:string;callback_url:string;metadata:Record<string,string>;channels?:string[]}){return paystackRequest<{status:boolean;message:string;data:{authorization_url:string;access_code:string;reference:string}}>('/transaction/initialize',{method:'POST',body:JSON.stringify({...input,currency:'NGN'})})}
export async function verifyPaystackTransaction(reference:string){return paystackRequest<PaystackTransaction>(`/transaction/verify/${encodeURIComponent(reference)}`)}

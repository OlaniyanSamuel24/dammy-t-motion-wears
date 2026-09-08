import {NextResponse} from 'next/server';
import {createHmac,timingSafeEqual} from 'node:crypto';
import {prisma} from '../../../../lib/prisma';
import {verifyPaystackTransaction} from '../../../../lib/paystack';

export async function POST(request:Request){
  const raw=await request.text();const signature=request.headers.get('x-paystack-signature')||'';const secret=process.env.PAYSTACK_SECRET_KEY;
  if(!secret||!signature)return NextResponse.json({error:'Invalid webhook configuration'},{status:400});
  const expected=createHmac('sha512',secret).update(raw).digest('hex');
  if(expected.length!==signature.length||!timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return NextResponse.json({error:'Invalid signature'},{status:401});
  try{
    const event=JSON.parse(raw) as {event:string;data:{reference:string}};
    if(!['charge.success','charge.failed','charge.abandoned'].includes(event.event))return NextResponse.json({received:true});
    const order=await prisma.order.findUnique({where:{paymentReference:event.data.reference},include:{items:true}});
    if(!order||order.paymentStatus==='PAID')return NextResponse.json({received:true});
    if(event.event!=='charge.success'){await prisma.order.update({where:{id:order.id},data:{paymentStatus:event.event==='charge.abandoned'?'ABANDONED':'FAILED'}});return NextResponse.json({received:true})}
    const payment=await verifyPaystackTransaction(event.data.reference);
    if(payment.data.status!=='success'||payment.data.currency!=='NGN'||payment.data.amount!==order.total*100)return NextResponse.json({error:'Payment validation failed'},{status:400});
    await prisma.$transaction(async transaction=>{
      const claimed=await transaction.order.updateMany({where:{id:order.id,paymentStatus:{not:'PAID'}},data:{paymentStatus:'PAID',status:'PAID',paidAt:payment.data.paid_at?new Date(payment.data.paid_at):new Date(),paymentChannel:payment.data.channel,paymentAmount:payment.data.amount}});
      if(claimed.count===0)return;
      for(const item of order.items){const stock=await transaction.product.updateMany({where:{id:item.productId,stock:{gte:item.quantity}},data:{stock:{decrement:item.quantity}}});if(stock.count!==1)throw new Error('Inventory unavailable')}
    });
    return NextResponse.json({received:true});
  }catch{return NextResponse.json({error:'Webhook processing failed'},{status:500})}
}

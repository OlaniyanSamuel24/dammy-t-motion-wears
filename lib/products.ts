import type { StaticImageData } from 'next/image';
import abenaDress from './abena dress.jpg';
import adireWarp from './adire wrap.jpg';
import asymetricPleat from './asymetric pleat.jpg';
import asoOke from './aso oke.jpg';
import handDyedCap from './hand dyed cap.jpg';
import kentePanelBlazers from './kente panel blazers.jpg';
import lagosLoafers from './lagos loafers.jpg';
import linenCoOrdSet from './linen co ord set.webp';
import nia from './nia.jpg';
import olowoLeatherDerby from './olowo leather derby.jpg';
import palmCourtShirt from './palm court shirt.jpg';
import sculptedMule from './sculpted mule.jpg';
import satinSlip from './satin slip.webp';
import utilityOvershirt from './utility overshirt.jpg';

export type Product = { id:string; name:string; seller:string; category:'Women'|'Men'|'Shoes'; price:number; oldPrice?:number; image:string|StaticImageData; color:string; sizes:string[]; badge?:string; rating:number; reviews:number; stock:number };
export const products: Product[] = [
{id:'1',name:'The Abena Dress',seller:'Osei Studio',category:'Women',price:68500,oldPrice:82000,image:abenaDress,color:'Terracotta',sizes:['XS','S','M','L'],badge:'Bestseller',rating:4.9,reviews:28,stock:8},
{id:'2',name:'Linen Co-ord Set',seller:'Kola & Co.',category:'Women',price:54000,image:linenCoOrdSet,color:'Sand',sizes:['S','M','L','XL'],badge:'New in',rating:4.8,reviews:14,stock:12},
{id:'3',name:'Hand-dyed Camp Shirt',seller:'Nubian House',category:'Men',price:42000,image:handDyedCap,color:'Indigo',sizes:['S','M','L','XL'],rating:4.7,reviews:19,stock:16},
{id:'4',name:'The Lagos Loafer',seller:'Atelier 54',category:'Shoes',price:79000,image:lagosLoafers,color:'Cognac',sizes:['40','41','42','43','44'],badge:'Limited',rating:5,reviews:9,stock:4},
{id:'5',name:'Satin Slip Skirt',seller:'Osei Studio',category:'Women',price:38000,image:satinSlip,color:'Olive',sizes:['XS','S','M','L'],rating:4.6,reviews:22,stock:10},
{id:'6',name:'Aso-Oke Weekend Trousers',seller:'Nubian House',category:'Men',price:47500,image:asoOke,color:'Onyx',sizes:['30','32','34','36'],rating:4.8,reviews:11,stock:7},
{id:'7',name:'Sculpted Mule',seller:'Atelier 54',category:'Shoes',price:61000,image:sculptedMule,color:'Bone',sizes:['36','37','38','39','40'],rating:4.7,reviews:16,stock:5},
{id:'8',name:'Kente Panel Blazer',seller:'Kola & Co.',category:'Men',price:96000,image:kentePanelBlazers,color:'Charcoal',sizes:['S','M','L','XL'],badge:"Editor's pick",rating:4.9,reviews:7,stock:3},
{id:'9',name:'Nia Draped Top',seller:'Osei Studio',category:'Women',price:31500,image:nia,color:'Ivory',sizes:['XS','S','M','L'],badge:'New in',rating:4.8,reviews:12,stock:14},
{id:'10',name:'Adire Wrap Skirt',seller:'Nubian House',category:'Women',price:46000,image:adireWarp,color:'Cobalt',sizes:['XS','S','M','L','XL'],rating:4.7,reviews:18,stock:9},
{id:'11',name:'Everyday Kaftan',seller:'Kola & Co.',category:'Men',price:58000,image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85',color:'Stone',sizes:['S','M','L','XL','XXL'],badge:'Bestseller',rating:4.9,reviews:31,stock:11},
{id:'12',name:'Lagos Utility Overshirt',seller:'Nubian House',category:'Men',price:52000,image:utilityOvershirt,color:'Rust',sizes:['S','M','L','XL'],rating:4.6,reviews:8,stock:6},
{id:'13',name:'Woven Slide Sandal',seller:'Atelier 54',category:'Shoes',price:43500,image:'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=85',color:'Espresso',sizes:['36','37','38','39','40','41'],rating:4.8,reviews:21,stock:13},
{id:'14',name:'Olowo Leather Derby',seller:'Atelier 54',category:'Shoes',price:87500,image:olowoLeatherDerby,color:'Black',sizes:['40','41','42','43','44','45'],badge:'Made to last',rating:4.9,reviews:13,stock:4},
{id:'15',name:'Asymmetric Pleat Dress',seller:'Osei Studio',category:'Women',price:73500,image:asymetricPleat,color:'Moss',sizes:['XS','S','M','L'],badge:'Limited',rating:4.8,reviews:10,stock:5},
{id:'16',name:'Palm Court Shirt',seller:'Kola & Co.',category:'Men',price:36500,image:palmCourtShirt,color:'White',sizes:['S','M','L','XL'],rating:4.7,reviews:15,stock:18}
];
export const money=(value:number)=>`₦${value.toLocaleString('en-NG')}`;

//import isEmpty from "lodash/isEmpty";
//import orderBy from "lodash/orderBy";
import { useRouter } from 'next/router';

export function generateCartItemName(item:any) {
//  console.log(item,'item');
 
  const {locale}:any=useRouter()
 return(
   item?.attributes?.value.toLowerCase().includes('dummy')? 
   locale==='ar' && item?.arabic_name ?  item?.arabic_name  : item?.name :
   locale==='ar' && item?.arabic_name ?  item?.arabic_name + " - "+ item?.attributes?.value : item?.name+ " - "+ item?.attributes?.value 
 ) 
  /*  if (!isEmpty(attributes)) {
    const sortedAttributes = orderBy(attributes);
    return `${name} - ${sortedAttributes.join(", ")}`;
  } 
  return name */
  // return name + " - "+ attributes.value;
}

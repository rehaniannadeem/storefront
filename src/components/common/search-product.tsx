import Link from "@components/ui/link";
import Image from "next/image";
import usePrice from "@framework/product/use-price";
import { ROUTES } from "@utils/routes";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

type SearchProductProps = {
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {
  const [_domainData, setDomainData] = useState({});
 // let urlName = item.name.replace(/\s+/g, "-");
  const [domainCurrencyCode, setDomainCurrencyCode] = useState("");
// console.log(item,'tiem');
const {locale}=useRouter()
  const { price, basePrice } = usePrice({
    amount: item.sale_price ? item.sale_price : item.price,
    baseAmount: item.price,
    currencyCode: domainCurrencyCode,
  });
  useEffect(() => {
    var domainData = JSON.parse(localStorage.getItem("domainData")!);
    if (domainData) {
      setDomainData(domainData);
    }
    setDomainCurrencyCode(domainData.currency.code);
  }, []);

  return (
    <Link
      href={`${ROUTES.PRODUCTS}/${item.name}`}
      className="group w-full h-auto flex justify-start items-center"
    >
      <div className="relative flex w-24 h-24 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4">
        <Image
        src={(item?.image?.thumbnail.includes('default.png') || item?.image?.thumbnail===null)?(
          item?.gallery[0]?.thumbnail ?? '/icons/ignite-default.png'
        ):(item?.image?.thumbnail) }
          // src={
          //   item?.image?.original ?? "/assets/placeholder/search-product.svg"
          // }
          width={96}
          height={96}
          loading="eager"
          alt={item.name || "Product Image"}
          className="bg-gray-200 object-cover"
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-sm text-heading mb-2">
        {locale==='ar' && item?.arabic_name ? item?.arabic_name : item?.name}
        </h3>
        <div className="text-heading font-semibold text-sm">
          {price}
          <del className="ps-2 text-gray-400 font-normal">{basePrice}</del>
        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;

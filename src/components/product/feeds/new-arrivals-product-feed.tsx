import ProductsBlock from "@containers/products-block";
// import { useNewArrivalProductsQuery } from "@framework/product/get-all-new-arrival-products";
import { useContext, useEffect, useState } from "react";
import { Context } from "src/pages/_app";

export default function NewArrivalsProductFeed() {
	// const { data, isLoading, error } = useNewArrivalProductsQuery({
	// 	limit: 10,
	// });
	const { products }: any = useContext(Context);
	const [productData, setProductData] = useState<any>([]);
	const[isLoading,setIsLoading]=useState(true)

	useEffect(() => {
		setIsLoading(true)
		setProductData(products);
		setIsLoading(false)
	  }, [products]);
	  console.log('this is product',products);
	return (
		<>
			{!isLoading &&
		<ProductsBlock
			sectionHeading="text-new-arrivals"
			products={productData}
			loading={isLoading}
			// error={error?.message}
			uniqueKey="new-arrivals"
		/>
		}
		</>
	
	);
}

import ProductsBlock from "@containers/products-block";
import { useBestSellerProductsQuery } from "@framework/product/get-all-best-seller-products";
import { useContext } from "react";
import { Context } from "src/pages/_app";
import { slice } from "lodash";
export default function BestSellerProductFeed() {
  const { /* data, */ isLoading, error } = useBestSellerProductsQuery({
    limit: 10,
  });
  const { products }: any = useContext(Context);
  const topProduct = slice(products, 0, 8);

  return (
    <ProductsBlock
      sectionHeading="text-best-sellers"
      products={topProduct}
      loading={isLoading}
      error={error?.message}
      uniqueKey="best-sellers"
    />
  );
}

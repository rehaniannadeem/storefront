import SectionHeader from "@components/common/section-header";
import ProductOverlayCard from "@components/product/product-overlay-card";

import { useContext } from "react";
import { Context } from "src/pages/_app";
import { slice } from "lodash";
interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  limit?: number;
  variant?: "left" | "center" | "combined";
}

const ProductsFeatured: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = "mb-12 md:mb-14 xl:mb-16",
  variant = "left",
  limit = 5,
}) => {
  /*   const { data, error } = useFeaturedProductsQuery({
    limit: limit,
  }); */
  const { products }: any = useContext(Context);
  const topProduct = slice(products, 1, limit);
  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />
      {/* {error ? (
        <Alert message={error?.message} />
      ) : ( */}
      {products && (
        <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-5 xl:gap-7">
          {topProduct.map((product: any, idx: number) => {
            if (product.name.toLocaleLowerCase() === "open product") {
              product.visibility = "hidden";
            } else {
              return (
                <ProductOverlayCard
                  key={`product--key${product.id}`}
                  product={product}
                  variant={variant}
                  index={idx}
                />
              );
            }
          })}
        </div>
      )}
      {/*  )} */}
    </div>
  );
};

export default ProductsFeatured;

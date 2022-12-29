import isEmpty from "lodash/isEmpty";

/* interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  [key: string]: unknown;
} */
export function generateCartItem(item: any, attributes: object) {
  const { id, name, slug, image, price,tax_id, /* sale_price, */variations } = item;

  return {
    id: !isEmpty(attributes)
      ? `${id}.${Object.values(attributes).join(".")}`
      : id,
    name,
    slug,
    image: image.thumbnail,
    //price: sale_price ? sale_price : price,
    price:price,
    tax_id,
    variations:variations,
    attributes,

  };
}

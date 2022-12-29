import cn from "classnames";

interface Props {
  className?: string;
  title: string;

  attributes: {
    /* 	id: number;
		value: string;
		meta: string; */
  }[];
  active: any;
  onClick: any;
  quantity: number;
  enable_stock: number;
}

export const ProductAttributes: React.FC<Props> = ({
  className = "mb-4",
  title,
  attributes,
  active,
  onClick,
  quantity,
  enable_stock,
}) => {
  // console.log(active);

  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
        {title}
      </h3>
      <ul className="colors flex flex-wrap-me-3">
        {attributes?.map((attribute: any) => (
          // console.log(attribute.variation_details[0], "attribute"),
          //   console.log(quantity, "quantity"),
          <li
            key={`${attribute.value}-${attribute.id}`}
            className={cn(
              "cursor-pointer rounded border border-gray-100 w-11 md:w-14 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
              {
                "border-black": attribute.value === active,
              }
            )}
            onClick={() => {
              {
                enable_stock == 1 &&
                attribute.variation_details[0].qty_available < quantity
                  ? null
                  : onClick(attribute);
              }
              // onClick(attribute);
            }}
            style={
              {
                textDecoration:
                  enable_stock == 1 &&
                  attribute?.variation_details[0]?.qty_available < quantity
                    ? "line-through"
                    : "none",
              }

              /*  textDecoration: "line-through",
                  textDecorationThickness: "2px", */
            }
          >
            {attribute.value}
            {/* {title === "color" ? (
              <span
                className="h-full w-full rounded block"
                style={{ backgroundColor: meta }}
              />
            ) : (
              value
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

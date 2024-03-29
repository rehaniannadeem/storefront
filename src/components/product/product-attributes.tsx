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
  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
        {title}
      </h3>
      <ul className="colors block overflow-x-auto">
        {attributes?.map((attribute: any) => (
          // console.log(attribute.variation_details[0], "attribute"),
          //   console.log(quantity, "quantity"),
          <li
            key={`${attribute.value}-${attribute.id}`}
            className={cn(
              "cursor-pointer font-b rounded border inline-flex border-gray-100 w-11 md:w-14 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
              {
                "border-black": attribute.value === active,
              //  "/assets/images/default.png": enable_stock == 1 && attribute?.variation_details[0]?.qty_available < quantity

              }
            )}
            onClick={() => {
              {
                enable_stock == 1 &&
                attribute?.variation_details[0]?.qty_available < quantity || attribute?.variation_details[0]?.qty_available==0
                  ? null
                  : onClick(attribute);
              }
              // onClick(attribute);
            }}
            style={
              {
                backgroundImage:
                  enable_stock == 1 &&
                  attribute?.variation_details[0]?.qty_available < quantity || attribute?.variation_details[0]?.qty_available==0
                    ? `url(${"/assets/images/soldout.png"})`
                    : "none",
                color:"red" ,
                backgroundPosition:  
                enable_stock == 1 &&
                attribute?.variation_details[0]?.qty_available < quantity || attribute?.variation_details[0]?.qty_available==0
                  ? "center"
                  : "none",
                 
               }

              /*  textDecoration: "line-through",
                  textDecorationThickness: "2px", */
             }
          >
           <span className="text-black">{attribute.value}</span>
            
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

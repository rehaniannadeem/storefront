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

export const ProductVariation: React.FC<Props> = ({
    className = "mb-4 ",
   // title,
    attributes,
    active,
    // onClick,
    // quantity,
    // enable_stock,
}) => {
const domainData:any=JSON.parse(localStorage.getItem("domainData")!)
const currencyCode=domainData?.currency?.code


  
    return (
        <div className={className}>
            <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
                {/* {title} */}
            </h3>
            <ul className="colors  grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3  gap-4   ">
                {attributes?.map((attribute: any) => (
                  // console.log(attribute.value)
                   
                    <li
                        /* w-11 md:w-14 h-9 md:h-11 */
                        key={`${attribute.value}-${attribute.id}`}
                        className={cn(
                            " cursor-pointer rounded border inline-flex border-gray-100    w-full  p-2 mb-2 md:mb-3 me-2 md:me-3 justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
                            {
                                "border-black": attribute.value === active ,
                            }
                        )}
                        // onClick={() => {
                        //     {
                        //         enable_stock == 1 &&
                        //             attribute.variation_details[0].qty_available < quantity
                        //             ? null
                        //             : onClick(attribute);
                        //     }
                        //     onClick(attribute);
                        // }}
                        // style={
                        //     {
                        //         textDecoration:
                        //             enable_stock == 1 &&
                        //                 attribute?.variation_details[0]?.qty_available < quantity
                        //                 ? "line-through"
                        //                 : "none",
                        //     }

                        //     /*  textDecoration: "line-through",
                        //         textDecorationThickness: "2px", */
                        // }
                    >
                       {/* { console.log(attribute?.variation_details[0]?.qty_available)} */}
                        
                        <div className="flex flex-col  ">
                            <span className="flex justify-center p-2"> SIZE:{attribute?.value}</span>
                            <span className="flex justify-center p-2">  SKU:{attribute?.sku}</span>
                            <span className="flex justify-center p-2"> {currencyCode}:{Number(attribute?.sell_price_inc_tax).toFixed(2)}</span>
                            {attribute?.variation_details[0]?.qty_available>0?<span className="flex justify-center p-2 bg-olive">STOCK: {Math.round(attribute?.variation_details[0]?.qty_available)}{" "}PCS  </span>:<span className="flex justify-center p-2 bg-red-400"> OUT OF STOCK </span>}
                            

                        </div>

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

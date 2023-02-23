type FooterItemProps = {
	id: string;
	name: string;
	price: string;
	code:string

};
export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps}> = ({
	item,
}) => {
	// console.log(item,'itemks');
	
	return (
		<div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
			{item.name}
			{item.price!=="Free" ?   <span className="ms-auto flex-shrink-0">{ item.code+" " + item.price}</span>:<span className="ms-auto flex-shrink-0">{item.price}</span>}
			
		</div>
	);
};

export interface TProduct {
	_id: string;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: Array<{
		rating: number;
		comment: string;
		date: Date;
		reviewerName: string;
		reviewerEmail: string;
	}>;
	returnPolicy: string;
	minimumOrderQuantity: number;
	images: string[];
	thumbnail: string;
}

export interface ProductsProps {
	products: Product[];
}
export interface ProductProps {
	product: TProduct;
}

import getProducts from "@/queries/getProducts";
import Product from "@/components/Product";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface ProductPageParams {
	params: {
		id: string;
	};
}

const ProductPage = async ({ params }: ProductPageParams) => {
	const { id } = await params;
	const products = await getProducts();
	const product = products.find((product) => product._id === id);

	if (!product) {
		notFound();
	}

	return <Product product={product} />;
};

export default ProductPage;

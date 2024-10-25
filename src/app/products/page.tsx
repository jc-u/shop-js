import getProducts from "@/queries/getProducts";
import Products from "@/components/Products";

export const dynamic = "force-dynamic";

const ProductsPage = async () => {
	const products = await getProducts();

	return <Products products={products} />;
};

export default ProductsPage;

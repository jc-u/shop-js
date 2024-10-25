import getProducts from "@/queries/getProducts";
import Cart from "@/components/Cart";

export const dynamic = "force-dynamic";

const CartPage = async () => {
	const products = await getProducts();

	return <Cart products={products} />;
};

export default CartPage;

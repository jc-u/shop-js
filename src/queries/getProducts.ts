import serialize from "@/utils/serialize";
import Product from "@/models/Product";

const getProducts = async () => {
	const products = await Product.find();
	return serialize(products);
};

export default getProducts;

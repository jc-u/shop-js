"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ProductsProps } from "@/types/types";

const Products: React.FC<ProductsProps> = ({ products }) => {
	const { state, dispatch } = useCart();
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<h1>Products</h1>

			<input
				type="text"
				placeholder="Search products"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<div>
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product) => {
						const quantityInCart =
							state.items.find((item) => item.id === product._id)?.quantity ||
							0;

						return (
							<div key={product._id}>
								<Link href={`/products/${product._id}`}>
									<h2>{product.title}</h2>
									<Image
										src={product.thumbnail}
										alt={product.title}
										width={200}
										height={200}
									/>
									<p>{product.price}</p>
								</Link>

								<p>Quantity in cart: {quantityInCart}</p>

								<button
									onClick={() =>
										dispatch({
											type: "INCREMENT_QUANTITY",
											payload: { id: product._id },
										})
									}>
									+
								</button>
								<button
									onClick={() =>
										dispatch({
											type: "DECREMENT_QUANTITY",
											payload: { id: product._id },
										})
									}
									disabled={quantityInCart === 0}>
									-
								</button>
								<button
									onClick={() =>
										dispatch({
											type: "ADD_TO_CART",
											payload: { id: product._id },
										})
									}>
									Add to cart
								</button>
							</div>
						);
					})
				) : (
					<p>No products found.</p>
				)}
			</div>
		</div>
	);
};

export default Products;

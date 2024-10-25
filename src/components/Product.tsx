"use client"; // Ce composant est rendu côté client

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // Hook pour utiliser le contexte du panier
import { ProductProps } from "@/types/types";

const Product: React.FC<ProductProps> = ({ product }) => {
	const { state, dispatch } = useCart(); // Utilisation du contexte du panier
	const quantityInCart =
		state.items.find((item) => item.id === product._id)?.quantity || 0;

	return (
		<div>
			<h1>{product.title}</h1>
			<Image
				src={product.thumbnail}
				alt={product.title}
				width={200}
				height={200}
			/>
			<p>{product.price}</p>

			<p>Quantity in cart: {quantityInCart}</p>

			{/* Boutons pour ajuster la quantité */}
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
					dispatch({ type: "ADD_TO_CART", payload: { id: product._id } })
				}>
				Add to cart
			</button>
		</div>
	);
};

export default Product;

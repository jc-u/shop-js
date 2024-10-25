"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ProductsProps } from "@/types/types";
import Link from "next/link";

const Cart: React.FC<ProductsProps> = ({ products }) => {
	const { state } = useCart();
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [isClient, setIsClient] = useState(false);

	// Vérifie que le composant est monté côté client
	useEffect(() => {
		setIsClient(true);
	}, []);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const totalPrice = isClient
		? state.items.reduce((total, item) => {
				const product = products.find((p) => p._id === item.id);
				return total + (product ? product.price * item.quantity : 0);
		  }, 0)
		: 0;

	return (
		<div>
			{isModalOpen && (
				<div className="modal">
					<h2>Bienvenue dans votre panier !</h2>
					<p>Vous pouvez vérifier vos articles ci-dessous.</p>
					<button onClick={closeModal}>Fermer</button>
				</div>
			)}
			<h1>Mon Panier</h1>
			{isClient &&
				(state.items.length === 0 ? (
					<p>Votre panier est vide.</p>
				) : (
					<ul>
						{state.items.map((item) => {
							const product = products.find((p) => p._id === item.id);
							return (
								<li key={item.id}>
									<span>
										{product?.title} - {item.quantity} x ${product?.price}
									</span>
								</li>
							);
						})}
					</ul>
				))}
			{isClient && <h2>Total: ${totalPrice.toFixed(2)}</h2>}
			<Link href="/payment">Passer à la caisse</Link>
		</div>
	);
};

export default Cart;

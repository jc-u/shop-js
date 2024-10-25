"use client";

import React, {
	createContext,
	useReducer,
	ReactNode,
	useContext,
	useEffect,
} from "react";

interface CartItem {
	id: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
}

type CartAction =
	| { type: "ADD_TO_CART"; payload: { id: string } }
	| { type: "REMOVE_FROM_CART"; payload: { id: string } }
	| { type: "INCREMENT_QUANTITY"; payload: { id: string } }
	| { type: "DECREMENT_QUANTITY"; payload: { id: string } };

const initialState: CartState = {
	items: [],
};

const CartContext = createContext<{
	state: CartState;
	dispatch: React.Dispatch<CartAction>;
}>({ state: initialState, dispatch: () => null });

const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case "ADD_TO_CART":
			return {
				...state,
				items: [...state.items, { id: action.payload.id, quantity: 1 }],
			};
		case "REMOVE_FROM_CART":
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload.id),
			};
		case "INCREMENT_QUANTITY":
			return {
				...state,
				items: state.items.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				),
			};
		case "DECREMENT_QUANTITY":
			return {
				...state,
				items: state.items.map((item) =>
					item.id === action.payload.id && item.quantity > 1
						? { ...item, quantity: item.quantity - 1 }
						: item
				),
			};
		default:
			return state;
	}
};

interface CartProviderProps {
	children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
		if (typeof window !== "undefined") {
			const storedCart = localStorage.getItem("cart");
			return storedCart ? JSON.parse(storedCart) : initial;
		}
		return initial;
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state));
	}, [state]);

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

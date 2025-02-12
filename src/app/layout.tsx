import type { Metadata } from "next";
import "./globals.css";
import connectToDbIfNotConnected from "@/middlewares/connectToDbIfNotConnected";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	await connectToDbIfNotConnected();
	return (
		<html lang="en">
			<body>
				<CartProvider>
					<Header />
					{children}
				</CartProvider>
			</body>
		</html>
	);
}

import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import products from "@/assets/products.json";
import connectToDbIfNotConnected from "@/middlewares/connectToDbIfNotConnected";

export async function GET(req: NextRequest) {
	try {
		await connectToDbIfNotConnected();
		await Product.insertMany(products);
		return NextResponse.json(
			{ message: "Products populated" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error populating products", error },
			{ status: 500 }
		);
	}
}

import { NextResponse } from "next/server";
import connectToDbIfNotConnected from "@/middlewares/connectToDbIfNotConnected";
import Product from "@/models/Product";

export const GET = async (request) => {
	try {
		await connectToDbIfNotConnected();
		const products = await Product.find();
		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
};

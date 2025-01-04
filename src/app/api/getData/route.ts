import {  NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";

export async function GET() {
  const database = connectToDatabase();

  try {
    const collection = database.collection("hackathon");

    console.log("Fetching 500 documents from Astra DB");
    const data = await collection.find({}).limit(1000).toArray();

    console.log(`Fetched ${data.length} documents from Astra DB`);
    console.log("Data fetched Successfully");
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data from Astra DB:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

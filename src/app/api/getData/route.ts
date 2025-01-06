/***
 * This route is for Raghav's Astra DB credentials Hackathon Database Name 
 * with data in below format
 *  _id: string;
    id: string;
    post_type: string;
    likes: string;
    shares: string;
    comments: string;
    created_at: string;
 * 
 */
import {  NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";

export async function GET() {
  const database = connectToDatabase();

  try {
    const collection = database.collection("hackathon");
    console.log("*******************Collection*******************")
    console.log(collection);

    const data = await collection.find({}).limit(1000).toArray();

    console.log(`Fetched ${data.length} documents from Astra DB`);
    console.log("Data fetched Successfully");
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data from Astra DB:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

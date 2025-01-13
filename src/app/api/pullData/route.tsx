import {  NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";

/***
 * This route is for ABHISHEK ( RAGHAV )'s Astra DB credentials instagram_data Database Name 
 * with data in below format
 *  _id: string;
    post_id: string;
    post_type: string;
    likes: string;
    shares: string;
    comments: string;
    created_at: string;
    impressions: string;
    reach: string;
    profile_visits: string;
    follower_count: string;
    date_posted: string;
    engagement_rate: string;
 * 
 */

export async function GET() {
  const database = connectToDatabase();

  try {
    const collection = database.collection(process.env.ASTRA_DB_KEYSPACE);

    const data = await collection.find({}).limit(1000).toArray();
    console.log(`Fetched ${data.length} documents from Astra DB`);
    console.log("Data fetched Successfully");
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data from Astra DB:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

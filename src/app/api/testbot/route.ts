// src/app/api/chatbot/route.ts
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    
    const response = {
      message: `
      ${message}
      **Insights of Reels vs Story:**

* Reels have an average of 500 likes and 50 comments.
* Reels have a 25% increase in engagement over the past month.
* Reels have a 30% increase in shares over the past quarter.
* The average watch time for Reels is 45 seconds.
* Reels have a 20% higher engagement rate than Stories.

**Key Strengths of Reels:**

* Reels have a high engagement rate compared to other post types.
* Reels have a significant increase in shares over the past quarter.

`
    }


    await new Promise(resolve => setTimeout(resolve, 3000))
    
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
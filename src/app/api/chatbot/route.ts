// src/app/api/chatbot/route.ts
import { NextResponse } from 'next/server'

class LangflowClient {
  private baseURL: string
  private applicationToken: string

  constructor(baseURL: string, applicationToken: string) {
    this.baseURL = baseURL
    this.applicationToken = applicationToken
  }

  async runFlow(input: string, retryCount: number = 1): Promise<string> {
    const flowId = '133c96f9-1cce-46c0-8659-6e1d3213376f'
    const langflowId = '7e18e1b3-1994-410f-a79b-02650cb8b0fd'
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}`

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.applicationToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input_value: input,
        input_type: 'chat',
        output_type: 'chat',
        tweaks: {
          "ChatInput-sauOX": {},
          "Prompt-MbW10": {},
          "CalculatorTool-ghqAs": {},
          "Prompt-lcf2i": {},
          "ChatOutput-dLfLl": {},
          "AstraDBToolComponent-Qujpu": {},
          "Agent-Kw20k": {}
        }
      })
    })

    console.log(response)

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('API error response:', errorBody)

      // Check for rate limit error
      if (response.status === 429 && retryCount > 0) {
        console.log('Rate limit exceeded. Retrying...')
        await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
        return this.runFlow(input, retryCount - 1)
      }

      if (response.status === 429) {
        throw new Error('API rate limit exceeded')
      }

      throw new Error(`API error: ${response.status} - ${errorBody}`)
    }

    const data = await response.json()
    return data.outputs[0].outputs[0].outputs.message.message.text
  }
}

// Initialize the client
const langflowClient = new LangflowClient(
  'https://api.langflow.astra.datastax.com',
  process.env.LANGFLOW_API_TOKEN! // Store token in .env.local
)

export async function POST(request: Request) {
  console.log("***************Entered the Post Request****************")
  try {
    const { message } = await request.json()
    const response = await langflowClient.runFlow(message, 2) // Allow 2 retries
    console.log("****************Exiting the Post Request******************")
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error:', error)
    if (error.message === 'API rate limit exceeded') {
      return NextResponse.json(
        { error: 'API rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

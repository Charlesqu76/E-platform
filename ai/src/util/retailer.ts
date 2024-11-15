import AI from "./ai";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  StringOutputParser,
  StructuredOutputParser,
} from "@langchain/core/output_parsers";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { z } from "zod";
import { sql } from "../sql";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";

dotenv.config();

class RetailerAi extends AI {
  constructor() {
    super();
  }

  aisearch = async (name) => {
    const searchTool = new TavilySearchResults({
      maxResults: 3,
    });
    const tools = [searchTool];

    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        price: z.number(),
        description: z.string(),
        references: z.array(z.string()),
      })
    );

    const text = `you are an analyiist and hired by a product retailer, 
        and will search the product name on the internet such as e-bay, amazon, and other ecommerce-platform, 
        format template: ${parser.getFormatInstructions()}
        product name: ${name} ,
        `;

    const agent = createReactAgent({
      llm: this.llmModel,
      tools,
    });

    const { messages } = await agent.invoke({ messages: text });

    const { content } = messages.slice(-1)[0];

    return await parser.parse(content);
  };

  normal = async (id, question: string, chatId: string, res: any) => {
    const [sales, view] = await Promise.all([
      sql.getData(id),
      sql.getViewData(id),
    ]);

    const history = new UpstashRedisChatMessageHistory({
      sessionId: chatId || "t",
      config: {
        // @ts-ignore
        url: process.env.REDIS_URL,
        // @ts-ignore
        token: process.env.REDIS_TOKEN,
      },
    });

    const memory = new BufferMemory({
      memoryKey: "test",
      chatHistory: history,
    });

    // @ts-ignore
    const historyText = await memory.loadMemoryVariables();

    memory.chatHistory.addUserMessage(question);

    let prompt = PromptTemplate.fromTemplate(
      `You are a data analyst hired by a product retailer. Your task is to analyze the sales data and user view data to answer the retailer's question effectively.

    Sales Data: {sales}
    View Data: {view}
    
    History: {history}

    Please provide a comprehensive analysis based on the following question:
    {question}`
    );
    if (question.includes("predict")) {
      prompt = PromptTemplate.fromTemplate(`
     Based on the historical sales data provided, your task is to predict future sales trends and explain why.
      Question: {question}

    Please present your prediction in the following format: {predictFormat}.
     `);
    }
    if (question.includes("portrait")) {
      prompt = PromptTemplate.fromTemplate(`
       Analyze the provided dataset that includes the following fields:
    - Name: User's name
    - Time: Time of action
    - Geo: User's geographic location
    - Device: Type of device used
    - Gender: User's gender

    Your analysis goals are:
    1. Identify trends in user behavior related to viewing and purchasing actions.
    2. Understand how geographic location and device types influence user actions.
    3. Examine the impact of gender on viewing and purchasing behaviors.
    4. Generate a user portrait summarizing typical behavior and preferences.
    5. Provide suggestions for improving engagement and conversion rates.

    Please consider the following question: {question}
        `);
    } else {
    }

    const chain = RunnableSequence.from([prompt, this.model]);

    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        predicts: z.array(z.object({ date: z.string(), value: z.number() })),
      })
    ).getFormatInstructions();

    const stream = chain.stream({
      history: historyText,
      sales: JSON.stringify(sales),
      view: JSON.stringify(view),
      predictFormat: parser,
      question,
    });

    let text = "";
    for await (const chunk of await stream) {
      text += chunk;
      res.write(chunk);
    }
    memory.chatHistory.addAIChatMessage(text);
    return stream;
  };
}

const retailerAI = new RetailerAi();

export default retailerAI;

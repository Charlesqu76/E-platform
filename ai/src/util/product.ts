import AI from "./ai";
import {
  StringOutputParser,
  StructuredOutputParser,
} from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { sql } from "../sql";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export class ProductAI extends AI {
  constructor() {
    super();
  }

  recommend = async (query: string, userId: number | null, file: string) => {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    let fileDescription = "";
    if (file) {
      try {
        const res = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "list the items in this image just the noun  not any adjective words",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: file,
                  },
                },
              ],
            },
          ],
        });
        fileDescription = res.choices[0].message.content;
      } catch {}
    }

    let res;
    if (userId) {
      res = await Promise.all([
        sql.queryProducts(),
        sql.queryUserRecord(userId),
      ]);
    } else {
      res = await Promise.all([sql.queryProducts()]);
    }
    const [products, preferences] = res;
    const productMap = products.reduce((acc, cur) => {
      acc[cur["id"]] = cur;
      return acc;
    }, {});

    const prompt = PromptTemplate.fromTemplate(`
      Recommend at least ten product IDs based on the following criteria:
        If a user query is provided, prioritize products that best match the query.
        If user preferences are provided, recommend products that align with these preferences.
        If both query and preferences are provided, consider both, with a stronger emphasis on the query.
        If neither query nor preferences are provided, recommend products ordered by ratings.
        Return product IDs in the following format: {format}.
        products: {products}
        User Query: {query}
        User Preferences: {preferences}
      `);

    const parser = StructuredOutputParser.fromZodSchema(z.array(z.number()));

    const chain = prompt.pipe(this.model).pipe(parser);

    const response = await chain.invoke({
      products: JSON.stringify(products),
      query: query || fileDescription,
      preferences: JSON.stringify(preferences),
      format: parser.getFormatInstructions(),
    });

    return response.map((id) => productMap[id]);
  };

  summary = async (id: string) => {
    const comments = await sql.comments(id);
    const prompt = PromptTemplate.fromTemplate(`
              You are analyzing a list of commit messages that describe product reviews. Each commit contains both the comment and rating provided by customers. Please summarize the following commits by identifying key themes in the customer comments, highlighting any common feedback, concerns, or praises, and providing an overall impression of the product. Your summary should focus on the customer's perspective, including:
                Positive aspects: What do customers like most about the product?
                Negative aspects: What are the recurring issues or concerns raised by customers?
                Average rating: Based on the ratings provided, what is the general satisfaction level of the customers?
                Example format:
                Positive aspects: Customers appreciate the [feature/aspect].
                Negative aspects: Many customers have raised concerns about [issue/aspect].
                Average rating: The overall satisfaction is [average rating or qualitative summary].
                Please summarize these and provide insights.
                comments: {comments}
              `);

    const parser = new StringOutputParser();
    const chain = prompt.pipe(this.model).pipe(parser);
    const response = await chain.invoke({ comments: JSON.stringify(comments) });

    return {
      summary: response,
    };
  };

  describe = async () => {
    const res = await this.llmModel.invoke(
      `describe the image url is: https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630`
    );
  };
}

const productAi = new ProductAI();

export default productAi;

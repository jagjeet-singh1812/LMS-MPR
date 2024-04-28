import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyAqu8gVHmRu4z0ZR3CszNf1n6dScysDkJ4";
const BASE_URL = "http://192.168.1.8:3001/aibot";
const genAI = new GoogleGenerativeAI(API_KEY);
const getBardApi = async (userMsg, name, desc) => {
  let messages = [{ content: userMsg }];
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log(userMsg);
  const prompt = `Act like a bot and you are a ${desc} and give and answer to this question : ${userMsg}.`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const textt = response.text();
  const proper = textt.replace(/\*/g, "").replace(/`/g, "");
  messages.push({ content: proper });
  console.log(messages);
  return messages;
};

export default {
  getBardApi,
};

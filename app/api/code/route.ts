import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Não configurada", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Mensagens são necessárias", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("A avaliação gratuita expirou. Atualize para premium.", { status: 403 });
    }


    const createChatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role: "system",
      content: "Você é um gerador de código. Você deve responder apenas em trechos de código de redução. Use comentários de código para explicações."}],
    });
   

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(createChatCompletion.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

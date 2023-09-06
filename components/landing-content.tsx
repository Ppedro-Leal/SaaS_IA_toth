"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Claudia",
    avatar: "J",
    title: "Engenheira de software",
    description: "Esse é o melhor aplicativo que já utilizei.",
  },
  {
    name: "Antonio",
    avatar: "A",
    title: "Designer",
    description: "Eu utilizo o aplicativo diariamente para gerar fotos. E é perfeito.",
  },
  {
    name: "Marcos",
    avatar: "M",
    title: "CEO",
    description: "Esse aplicativo mudou minha vida, não consigo me imaginar no trabalho sem ele!",
  },
  {
    name: "Maria",
    avatar: "M",
    title: "CEO",
    description: "O melhor que há, realmente valeu a pena pagar pela versão premium",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Usuários</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
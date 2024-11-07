import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserStreamUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `
        Une question te sera posée, et ta tâche est de donner une réponse avec les avantages et les inconvénients.
        La réponse doit être au format markdown.
        Les avantages et inconvénients doivent être présentés sous forme de liste.
      `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });
};

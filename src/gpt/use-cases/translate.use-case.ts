import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Traduisez le texte suivant en ${lang}:${prompt}`,
      },
    ],
    temperature: 0.2,
    // max_tokens: 500
  });

  return { message: response.choices[0].message.content };
};

import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Des textes en français avec des erreurs possibles d'orthographe et de grammaire te seront fournis.
        Les mots utilisés doivent exister dans le dictionnaire de l'Académie française.
        Tu dois répondre au format JSON.
        Ta tâche est de corriger les erreurs et de fournir des solutions, ainsi que de donner un pourcentage de réussite pour l'utilisateur.

        Si aucune erreur n'est détectée, tu dois renvoyer un message de félicitations.

        Exemple de sortie :
        {
          userScore: number,
          errors: string[], // ['erreur -> solution']
          message: string, // Utilise des emojis et un texte pour féliciter l'utilisateur
        }
       `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  // console.log(completion);
  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};

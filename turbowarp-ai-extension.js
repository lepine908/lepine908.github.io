// Extension IA Simple pour TurboWarp
// Fonctionne avec n'importe quel proxy compatible OpenAI

(function(Scratch) {
  'use strict';

  // URL du proxy par défaut (modifiable via un bloc)
  let API_URL = 'https://api.tmrace.net/v1/chat/completions';

  class SimpleAI {
    getInfo() {
      return {
        id: 'simpleaichat',
        name: 'Simple AI Chat',
        color1: '#4C97FF',
        blocks: [
          {
            opcode: 'setApiUrl',
            blockType: Scratch.BlockType.COMMAND,
            text: 'définir l\'URL API [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://api.tmrace.net/v1/chat/completions'
              }
            }
          },
          {
            opcode: 'askAI',
            blockType: Scratch.BlockType.REPORTER,
            text: 'demander à l\'IA [PROMPT]',
            arguments: {
              PROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Bonjour !'
              }
            }
          },
          {
            opcode: 'isWorking',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'l\'API fonctionne-t-elle ?'
          }
        ]
      };
    }

    setApiUrl(args) {
      API_URL = args.URL;
    }

    async isWorking() {
      try {
        // Test simple sans envoyer de gros message
        const response = await Scratch.fetch(API_URL, {
          method: 'OPTIONS' // Juste un test de connexion
        });
        return response.ok || response.status === 400; // 400 est OK car on n'envoie pas de corps
      } catch (e) {
        return false;
      }
    }

    async askAI(args) {
      const prompt = args.PROMPT;
      
      try {
        const response = await Scratch.fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 150
          })
        });

        if (!response.ok) {
          return `Erreur: ${response.status}`;
        }

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
          return data.choices[0].message.content;
        } else {
          return 'Réponse vide';
        }

      } catch (error) {
        return 'Échec de la connexion (CORS ou API HS)';
      }
    }
  }

  Scratch.extensions.register(new SimpleAI());
})(Scratch);   

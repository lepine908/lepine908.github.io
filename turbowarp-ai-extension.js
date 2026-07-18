// Extension IA Simple pour TurboWarp (Hugging Face Edition)
// Aucune clé API payante requise, utilise votre token gratuit Hugging Face.

(function(Scratch) {
  'use strict';

  // ============================================================
  // CONFIGURATION : COLLEZ VOTRE CLÉ HUGGING FACE CI-DESSOUS
  // Elle doit commencer par "hf_"
  // ============================================================
  const MA_CLE = "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"; 
  
  // Modèle utilisé (Mistral 7B est rapide et gratuit)
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

  class SimpleAI {
    getInfo() {
      return {
        id: 'simpleaichat',
        name: 'Simple AI Chat',
        color1: '#4C97FF',
        color2: '#3373CC',
        blocks: [
          {
            opcode: 'askAI',
            blockType: Scratch.BlockType.REPORTER,
            text: 'demander à l\'IA [PROMPT]',
            arguments: {
              PROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Bonjour, qui es-tu ?'
              }
            }
          },
          {
            opcode: 'checkStatus',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'l\'API est-elle prête ?'
          }
        ]
      };
    }

    // Vérifie si la clé est présente et si le modèle répond
    async checkStatus() {
      if (MA_CLE === "hf_VOTRE_CLE_ICI" || MA_CLE === "") {
        return false; // Clé non configurée
      }
      
      try {
        // Test rapide avec un prompt vide ou très court
        const response = await Scratch.fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + MA_CLE
          },
          body: JSON.stringify({
            inputs: 'test',
            parameters: { max_new_tokens: 5 }
          })
        });
        
        // Si on reçoit une réponse (même une erreur de modèle chargé), c'est que la clé est bonne
        // Le code 503 signifie "Modèle en chargement", ce qui est normal pour le gratuit
        return response.ok || response.status === 503; 
      } catch (e) {
        return false;
      }
    }

    async askAI(args) {
      const prompt = args.PROMPT;

      // Vérification de sécurité
      if (MA_CLE === "hf_VOTRE_CLE_ICI" || MA_CLE === "") {
        return "ERREUR: Vous n'avez pas mis votre clé API dans le code de l'extension !";
      }

      try {
        const response = await Scratch.fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + MA_CLE
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 200,      // Longueur max de la réponse
              return_full_text: false,  // Ne renvoie que la réponse, pas la question
              temperature: 0.7          // Créativité (0.0 à 1.0)
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          if (response.status === 503) {
            return "Le modèle se réveille... Réessayez dans 10 secondes.";
          }
          return `Erreur API (${response.status}): ${errorData}`;
        }

        const data = await response.json();
        
        // Hugging Face renvoie un tableau : [{ generated_text: "..." }]
        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
          return data[0].generated_text.trim();
        } else {
          return "Réponse vide ou format inconnu.";
        }

      } catch (error) {
        return "Échec de la connexion (Vérifiez votre internet ou votre clé).";
      }
    }
  }

  Scratch.extensions.register(new SimpleAI());
})(Scratch);   

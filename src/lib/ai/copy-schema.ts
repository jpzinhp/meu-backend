// A ajuda `zodOutputFormat` do SDK da Anthropic (usada em generate-copy.ts)
// exige um schema Zod v4 — por isso este arquivo importa especificamente de
// "zod/v4", enquanto o resto da aplicação usa a API clássica ("zod" v3) em
// src/lib/validation.ts. Ambas convivem no mesmo pacote "zod" >= 3.25.
import { z } from 'zod/v4';

export const AiSiteCopySchema = z.object({
  tagline: z
    .string()
    .describe('Frase de efeito curta e marcante para o topo do site (máx. 8 palavras), em português do Brasil.'),
  description: z
    .string()
    .describe('Uma frase de apoio (1 frase, até 160 caracteres) logo abaixo da frase de efeito.'),
  about: z
    .string()
    .describe('Parágrafo "Sobre nós" (2 a 4 frases) apresentando o negócio de forma profissional e calorosa.'),
  services: z
    .array(
      z.object({
        name: z.string().describe('Nome curto do serviço/produto/especialidade.'),
        description: z.string().describe('Descrição em 1 frase.'),
      }),
    )
    .min(3)
    .max(6)
    .describe('Lista de serviços, produtos ou especialidades típicos deste negócio.'),
  differentiators: z
    .array(z.string())
    .min(3)
    .max(5)
    .describe('Frases curtas (3 a 5 palavras) com diferenciais competitivos do negócio.'),
});

export type AiSiteCopy = z.infer<typeof AiSiteCopySchema>;

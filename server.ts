import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveGovernedNaturalLanguageQuery } from './src/engine/semanticLayer.ts';
import { Persona, Region } from './src/types/ontology.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const portArgIndex = process.argv.indexOf('--port');
const portFromArgs = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1], 10) : undefined;
const PORT = Number(process.env.PORT || portFromArgs || 3000);

app.use(express.json());

// Basic health check for monitoring
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Initialize Gemini Client safely on server side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.post('/api/governed-query', async (req: Request, res: Response) => {
  const query = req.body.query || req.body.prompt;
  const persona: Persona = req.body.persona || 'planning';
  const regionScope: Region = req.body.regionScope || req.body.filterRegion || 'Global';

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Calculate canonical semantic layer response
  const governedResult = resolveGovernedNaturalLanguageQuery(query, persona, regionScope);

  // If Gemini API is configured, optionally enrich the executive summary with AI
  if (ai && process.env.GEMINI_API_KEY) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are the executive briefing voice for a Governed Supply Chain Semantic Layer.
User Query: "${query}"
Active Persona: "${persona}"
Region Scope: "${regionScope}"
Canonical Metric: ${governedResult.governanceVerification.canonicalMetricId} = ${governedResult.metrics.canonicalValue}
Formula: ${governedResult.governanceVerification.canonicalFormula}
Contextual Summary: ${governedResult.executiveSummary}

Write a crisp, authoritative 2-3 sentence executive briefing summarizing why this metric value was calculated identically across personas, and highlighting the primary operational takeaway. Do NOT alter the metric number.`,
        config: {
          temperature: 0.2,
        },
      });

      if (response.text) {
        governedResult.executiveSummary = response.text.trim();
      }
    } catch (err: any) {
      console.warn('Gemini enrichment skipped, using deterministic semantic layer summary:', err?.message);
    }
  }

  return res.json(governedResult);
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Supply Chain Governed Analytics server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

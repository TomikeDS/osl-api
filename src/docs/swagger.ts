import { readFileSync } from 'node:fs';
import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Resolves to the repo root from both src/docs (tests) and dist/docs (build).
const { version } = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),
) as { version: string };

/** Serves Swagger UI at /docs and the OpenAPI JSON at /docs-json. */
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Open Support Ledger API')
    .setDescription(
      'Backend API for Open Support Ledger, a transparent funding page and public payment ledger for open-source projects.',
    )
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, { jsonDocumentUrl: 'docs-json' });
}

// src/tracer.js

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const resource = new resourceFromAttributes({
  [SemanticResourceAttributes.SERVICE_NAME]: 'frontend',
});

const collectorEndpoint = 'http://localhost:4318/v1/traces';

const exporter = new OTLPTraceExporter({
  url: collectorEndpoint,
});

const provider = new WebTracerProvider({
  resource: resource,
  spanProcessors: [new BatchSpanProcessor(exporter)]
});

provider.register();

registerInstrumentations({
  instrumentations: [
    new DocumentLoadInstrumentation(),
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [
        /http:\/\/localhost:8080/i, // Regex that matches your backend's URL
      ],
    }),
  ],
});

console.log("OpenTelemetry tracing initialized for React.");
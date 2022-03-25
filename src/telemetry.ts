import { OpenTelemetryModule } from "nestjs-otel";
import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// instrumentation
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { MySQL2Instrumentation } from '@opentelemetry/instrumentation-mysql2';
import { KafkaJsInstrumentation } from "opentelemetry-instrumentation-kafkajs";

const jaegerExporter = new JaegerExporter({
  tags: [],
  endpoint: 'http://localhost:14268/api/traces', // TODO: take it from the config
  maxPacketSize: 65000
});

export const otelSDK = new NodeSDK({
  metricExporter: new PrometheusExporter({
    port: 8081,
    endpoint: 'prometheus'
  }),
  metricInterval: 1000,
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'nestjs-observability-demo',
  }),
  contextManager: new AsyncLocalStorageContextManager(),
  spanProcessor: new BatchSpanProcessor(jaegerExporter),
  textMapPropagator: new JaegerPropagator(), 
  instrumentations: [
    new HttpInstrumentation({
      ignoreIncomingPaths: ['/metrics', '/favicon.ico']
    }),
    new MySQL2Instrumentation(),
    new KafkaJsInstrumentation(),
  ],
});

export const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
    metrics: {
      hostMetrics: false,
      defaultMetrics: true,
      apiMetrics: {
        enable: true,
        timeBuckets: [0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10],
        ignoreRoutes: ['/favicon.ico'],
        ignoreUndefinedRoutes: false,
      },
    },
  });
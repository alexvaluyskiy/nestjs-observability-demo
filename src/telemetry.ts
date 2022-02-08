import { OpenTelemetryModule } from "nestjs-otel";
import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

export const otelSDK = new NodeSDK({
  metricExporter: new PrometheusExporter({
    port: 8081,
  }),
  metricInterval: 1000,
  instrumentations: [],
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
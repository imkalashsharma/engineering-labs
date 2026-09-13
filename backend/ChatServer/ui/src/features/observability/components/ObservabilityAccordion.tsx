import {
  Activity,
  CheckCircle2,
  CircleAlert,
  Database,
  Gauge,
  Server,
  Zap,
} from "lucide-react";

import {
  useCircuitBreakerState,
  useMessageProcessingTime,
  useMessagesFailed,
  useMessagesProcessed,
  useSystemHealth,
} from "../hooks/useObservability";
const MetricItem = ({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
}) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="mb-1 flex items-center gap-2 text-slate-500">
        {icon}

        <span className="text-xs font-medium">{label}</span>
      </div>

      <div className="text-lg font-semibold text-slate-900">
        {value}

        {unit && (
          <span className="ml-1 text-xs font-normal text-slate-500">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

const ObservabilityAccordion = () => {
  const messagesProcessed = useMessagesProcessed();
  const messagesFailed = useMessagesFailed();
  const processingTime = useMessageProcessingTime();
  const circuitBreaker = useCircuitBreakerState();
  const systemHealth = useSystemHealth();

  /*
   * Messages processed
   */
  const processedCount =
    messagesProcessed.data?.measurements?.find(
      (measurement: { statistic: string }) => measurement.statistic === "COUNT",
    )?.value ?? 0;

  /*
   * Messages failed
   */
  const failedCount =
    messagesFailed.data?.measurements?.find(
      (measurement: { statistic: string }) => measurement.statistic === "COUNT",
    )?.value ?? 0;

  /*
   * Processing time
   *
   * Actuator returns seconds:
   *
   * COUNT       = number of messages
   * TOTAL_TIME  = total processing time in seconds
   *
   * Average = TOTAL_TIME / COUNT
   *
   * Convert seconds -> milliseconds
   */
  const processingMeasurements = processingTime.data?.measurements ?? [];

  const processingCount =
    processingMeasurements.find(
      (measurement: { statistic: string }) => measurement.statistic === "COUNT",
    )?.value ?? 0;

  const totalProcessingTime =
    processingMeasurements.find(
      (measurement: { statistic: string }) =>
        measurement.statistic === "TOTAL_TIME",
    )?.value ?? 0;

  const averageProcessingTime =
    processingCount > 0 ? (totalProcessingTime / processingCount) * 1000 : 0;

  /*
   * Circuit breaker
   *
   * useCircuitBreakerState() should return:
   *
   * "closed"
   * "open"
   * "half_open"
   * etc.
   */
  const circuitBreakerState = circuitBreaker.data ?? null;

  /*
   * System health
   */
  const systemStatus = systemHealth.data?.status ?? "UNKNOWN";

  const isSystemHealthy = systemStatus === "UP";

  /*
   * Cassandra health
   */
  const cassandraStatus =
    systemHealth.data?.components?.cassandra?.status ?? "UNKNOWN";

  const isCassandraHealthy = cassandraStatus === "UP";

  return (
    <details className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-blue-600" />

          <span className="text-sm font-semibold text-slate-800">
            Observability
          </span>

          <span className="text-xs text-slate-400">Live metrics</span>
        </div>

        <span className="text-xs text-slate-400">Every 5s</span>
      </summary>

      {/* Content */}
      <div className="border-t border-slate-200 bg-slate-50 p-4">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricItem
            icon={<Zap className="h-4 w-4" />}
            label="Messages Processed"
            value={processedCount}
          />

          <MetricItem
            icon={<CircleAlert className="h-4 w-4" />}
            label="Messages Failed"
            value={failedCount}
          />

          <MetricItem
            icon={<Gauge className="h-4 w-4" />}
            label="Avg Processing"
            value={averageProcessingTime.toFixed(2)}
            unit="ms"
          />

          <MetricItem
            icon={<Activity className="h-4 w-4" />}
            label="Circuit Breaker"
            value={circuitBreakerState ? circuitBreakerState : "—"}
          />
        </div>

        {/* Health */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Cassandra */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-slate-500" />

              <span className="text-sm text-slate-700">Cassandra</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  isCassandraHealthy ? "bg-emerald-500" : "bg-red-500"
                }`}
              />

              <span
                className={`text-xs font-medium ${
                  isCassandraHealthy ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {cassandraStatus}
              </span>
            </div>
          </div>

          {/* System */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-slate-500" />

              <span className="text-sm text-slate-700">System</span>
            </div>

            <div className="flex items-center gap-1.5">
              {isSystemHealthy ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                  <span className="text-xs font-medium text-emerald-600">
                    Healthy
                  </span>
                </>
              ) : (
                <>
                  <CircleAlert className="h-4 w-4 text-red-500" />

                  <span className="text-xs font-medium text-red-600">
                    Unhealthy
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </details>
  );
};

export default ObservabilityAccordion;

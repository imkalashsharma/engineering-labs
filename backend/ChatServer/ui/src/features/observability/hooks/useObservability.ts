import { useQuery } from "@tanstack/react-query";

const ACTUATOR_URL = `${import.meta.env.VITE_API_URL}/actuator`;

export const useMessagesProcessed = () => {
  return useQuery({
    queryKey: ["observability", "messages-processed"],
    queryFn: async () => {
      const response = await fetch(
        `${ACTUATOR_URL}/metrics/canto.messages.processed`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages processed metric");
      }

      return response.json();
    },
    refetchInterval: 5000,
  });
};

export const useMessagesFailed = () => {
  return useQuery({
    queryKey: ["observability", "messages-failed"],
    queryFn: async () => {
      const response = await fetch(
        `${ACTUATOR_URL}/metrics/canto.messages.failed`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages failed metric");
      }

      return response.json();
    },
    refetchInterval: 5000,
  });
};

export const useMessageProcessingTime = () => {
  return useQuery({
    queryKey: ["observability", "message-processing-time"],
    queryFn: async () => {
      const response = await fetch(
        `${ACTUATOR_URL}/metrics/canto.message.processing.time`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch message processing time metric");
      }

      return response.json();
    },
    refetchInterval: 5000,
  });
};

export const useCircuitBreakerState = () => {
  return useQuery({
    queryKey: ["observability", "circuit-breaker", "cassandra"],
    queryFn: async () => {
      const states = [
        "closed",
        "open",
        "half_open",
        "forced_open",
        "disabled",
        "metrics_only",
      ];

      const results = await Promise.all(
        states.map(async (state) => {
          const response = await fetch(
            `${ACTUATOR_URL}/metrics/resilience4j.circuitbreaker.state?tag=name:cassandra&tag=state:${state}`,
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch circuit breaker state: ${state}`);
          }

          const data = await response.json();

          const value =
            data.measurements?.find(
              (measurement: { statistic: string }) =>
                measurement.statistic === "VALUE",
            )?.value ?? 0;

          return {
            state,
            active: value === 1,
          };
        }),
      );

      return results.find((result) => result.active)?.state ?? null;
    },
    refetchInterval: 5000,
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ["observability", "health"],
    queryFn: async () => {
      const response = await fetch(`${ACTUATOR_URL}/health`);

      if (!response.ok) {
        throw new Error("Failed to fetch system health");
      }

      return response.json();
    },
    refetchInterval: 5000,
  });
};

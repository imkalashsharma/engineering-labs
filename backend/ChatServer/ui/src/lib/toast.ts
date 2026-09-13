import { toast } from "../components/ui/toast";

export const notify = {
  success: (message: string) => {
    toast.add({
      type: "success",
      description: message,
    });
  },

  error: (message: string) => {
    toast.add({
      type: "error",
      description: message,
      priority: "high",
    });
  },

  warning: (message: string) => {
    toast.add({
      type: "warning",
      description: message,
    });
  },

  info: (message: string) => {
    toast.add({
      type: "info",
      description: message,
    });
  },

  default: (message: string) => {
    toast.add({
      description: message,
    });
  },
};

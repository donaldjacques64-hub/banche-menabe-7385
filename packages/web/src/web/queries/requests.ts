import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useCreateRequest() {
  return useMutation(orpc.requests.create.mutationOptions());
}

import { UseQueryOptions, useMutation } from "@tanstack/vue-query";
import { login } from "./auth";
import { ILoginBody } from "@/types/auth.types";

export const loginMutation = (options?: UseQueryOptions) => {
  return useMutation({
    mutationFn: (body: ILoginBody) => login(body),
  });
};

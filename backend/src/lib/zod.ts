import z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
export const signUpSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Must have atleast 6 characters" })
    .regex(passwordValidation, {
      message: "must contain a uppercase, lowercase, number, special character",
    }),
});

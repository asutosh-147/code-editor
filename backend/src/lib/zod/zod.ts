import z, { nativeEnum } from "zod";

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

const nodeSchema = z.enum(["FOLDER", "FILE"], { message: "Invalid Type" });
export const fileNodeSchema = z
  .object({
    name: z.string().min(1, { message: "Non Empty Name" }),
    type: nodeSchema,
    parentId: z.number(),
  })
  .refine(
    (data) => {
      if (data.type === "FOLDER") {
        if (data.name.includes(".")) return false;
        return true;
      } else {
        const splited = data.name.split(".");
        if (splited.length !== 2 || !/(py|cpp|js)/.test(splited[1])) {
          return false;
        }
        return true;
      }
    },
    {
      message: "Invalid Inputs",
    }
  );

export const fileUpdateSchema = z.object({
  name: z.string().min(1, { message: "Non Empty Name" }),
  id: z.number(),
  parentId: z.number(),
});

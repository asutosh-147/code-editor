import z from "zod";

//auth validation
export const signUpSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Please Enter a valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain atleast one uppercase",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain atleast one lowercase",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain atleast one digit",
    })
    .refine((value) => /[#?!@$%^&*-]/.test(value), {
      message: "Password must contain atleast one special character",
    }),
});
export const signInSchema = z.object({
  email: z.string().email({ message: "Please Enter a valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
export type signUpType = z.infer<typeof signUpSchema>;
export type signInType = z.infer<typeof signInSchema>;

//fileTree input validation

export const inputTreeSchema = z
  .object({
    name: z.string().min(1),
    isFile: z.boolean(),
  })
  .superRefine(
    (data,ctx) => {
      if (data.isFile) {
        const splited = data.name.split(".");
        if (splited.length !== 2 || !/(py|cpp|js)/.test(splited[1])){
          ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"file name mustcontain a valid supported extension",
            path:["name"]
          })
        }
      } else {
        if (data.name.includes(".")){
          ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"folder Name must not contain '.'",
            path:["name"]
          })
        }
      }
    }
  );
export type treeInputType = z.infer<typeof inputTreeSchema>;

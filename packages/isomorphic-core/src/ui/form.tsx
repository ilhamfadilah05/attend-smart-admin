import type { Schema } from "zod";
import { useEffect } from "react";
import { useForm, SubmitHandler, UseFormReturn, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ServerErrors<T> = {
  [Property in keyof T]: string;
};

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  fieldErrors?: any[] | null;
  formError?: string | string[] | null | any;
  serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetValues?: any | null;
  className?: string;
  errors?: Record<any, any>;
};

export const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  fieldErrors,
  formError,
  resetValues,
  className,
  errors,
  ...formProps
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && { resolver: zodResolver(validationSchema) }),
  });

  useEffect(() => {
    if (resetValues) {
      methods.reset(resetValues);
    }
    if (errors) {
      for (const key in errors) {
        const element = errors[key];
        methods.setError(key as any, { ...element, type: "onChange" });
      }
      errors = {};
    } else {
      methods.clearErrors();
    }
  }, [resetValues, methods]);

  return (
    <form noValidate onSubmit={methods.handleSubmit(onSubmit)} {...formProps} className={className}>
      {children(methods)}
    </form>
  );
};

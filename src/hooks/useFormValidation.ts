import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';

interface UseFormValidationOptions<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  successMessage?: string;
  errorMessage?: string;
}

interface UseFormValidationReturn<T extends FieldValues> {
  form: UseFormReturn<T>;
  isSubmitting: boolean;
  submitError: string | null;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  resetForm: () => void;
}

export function useFormValidation<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  successMessage = 'Form submitted successfully',
  errorMessage = 'Failed to submit form'
}: UseFormValidationOptions<T>): UseFormValidationReturn<T> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange'
  });

  const handleSubmit = form.handleSubmit(async (data: T) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit?.(data);
      toast.success(successMessage);
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage;
      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  });

  const resetForm = () => {
    form.reset();
    setSubmitError(null);
  };

  return {
    form,
    isSubmitting,
    submitError,
    handleSubmit,
    resetForm
  };
}
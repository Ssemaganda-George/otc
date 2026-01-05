import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';
import { z } from 'zod';
import { FieldValues } from 'react-hook-form';

interface ModalFormProps<T extends FieldValues> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  schema: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => Promise<void> | void;
  children: (form: ReturnType<typeof useFormValidation>['form']) => React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ModalForm<T extends FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  schema,
  defaultValues,
  onSubmit,
  children,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  size = 'md'
}: ModalFormProps<T>) {
  const { form, isSubmitting, submitError, handleSubmit, resetForm } = useFormValidation({
    schema,
    defaultValues: defaultValues as any,
    onSubmit: async (data) => {
      await onSubmit(data);
      onOpenChange(false);
      resetForm();
    }
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isSubmitting) {
      onOpenChange(false);
      resetForm();
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={`${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {children(form as any)}

          {submitError && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {submitError}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
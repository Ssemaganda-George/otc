import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface UseBulkOperationsOptions {
  table: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseBulkOperationsReturn {
  selectedIds: string[];
  isProcessing: boolean;
  error: string | null;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  bulkDelete: () => Promise<boolean>;
  bulkUpdate: (updates: Record<string, any>) => Promise<boolean>;
}

export function useBulkOperations({
  table,
  onSuccess,
  onError
}: UseBulkOperationsOptions): UseBulkOperationsReturn {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: any, operation: string) => {
    const errorMessage = err?.message || `Failed to ${operation}`;
    setError(errorMessage);
    toast.error(errorMessage);
    onError?.(new Error(errorMessage));
  }, [onError]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  }, []);

  const selectAll = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const bulkDelete = useCallback(async (): Promise<boolean> => {
    if (selectedIds.length === 0) return false;

    setIsProcessing(true);
    setError(null);

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .in('id', selectedIds);

      if (error) throw error;

      const count = selectedIds.length;
      setSelectedIds([]);
      toast.success(`Successfully deleted ${count} item${count > 1 ? 's' : ''}`);
      onSuccess?.();
      return true;
    } catch (err) {
      handleError(err, 'delete selected items');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [table, selectedIds, onSuccess, handleError]);

  const bulkUpdate = useCallback(async (updates: Record<string, any>): Promise<boolean> => {
    if (selectedIds.length === 0) return false;

    setIsProcessing(true);
    setError(null);

    try {
      const { error } = await supabase
        .from(table)
        .update(updates)
        .in('id', selectedIds);

      if (error) throw error;

      const count = selectedIds.length;
      setSelectedIds([]);
      toast.success(`Successfully updated ${count} item${count > 1 ? 's' : ''}`);
      onSuccess?.();
      return true;
    } catch (err) {
      handleError(err, 'update selected items');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [table, selectedIds, onSuccess, handleError]);

  return {
    selectedIds,
    isProcessing,
    error,
    toggleSelection,
    selectAll,
    clearSelection,
    bulkDelete,
    bulkUpdate
  };
}
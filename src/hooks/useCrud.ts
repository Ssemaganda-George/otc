import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface UseCrudOptions<T> {
  table: string;
  onSuccess?: (data: T | T[]) => void;
  onError?: (error: Error) => void;
}

interface UseCrudReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  create: (item: Omit<T, 'id' | 'created_at'>) => Promise<T | null>;
  update: (id: string, item: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<boolean>;
  fetchAll: (orderBy?: string, ascending?: boolean) => Promise<void>;
  fetchOne: (id: string) => Promise<T | null>;
}

export function useCrud<T extends { id: string; created_at?: string }>({
  table,
  onSuccess,
  onError
}: UseCrudOptions<T>): UseCrudReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: any, operation: string) => {
    const errorMessage = err?.message || `Failed to ${operation}`;
    setError(errorMessage);
    toast.error(errorMessage);
    onError?.(new Error(errorMessage));
  }, [onError]);

  const create = useCallback(async (item: Omit<T, 'id' | 'created_at'>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(item)
        .select()
        .single();

      if (error) throw error;

      setData(prev => [result, ...prev]);
      toast.success('Item created successfully');
      onSuccess?.(result);
      return result;
    } catch (err) {
      handleError(err, 'create item');
      return null;
    } finally {
      setLoading(false);
    }
  }, [table, onSuccess, handleError]);

  const update = useCallback(async (id: string, item: Partial<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(item)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setData(prev => prev.map(d => d.id === id ? result : d));
      toast.success('Item updated successfully');
      onSuccess?.(result);
      return result;
    } catch (err) {
      handleError(err, 'update item');
      return null;
    } finally {
      setLoading(false);
    }
  }, [table, onSuccess, handleError]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setData(prev => prev.filter(d => d.id !== id));
      toast.success('Item deleted successfully');
      onSuccess?.(data);
      return true;
    } catch (err) {
      handleError(err, 'delete item');
      return false;
    } finally {
      setLoading(false);
    }
  }, [table, data, onSuccess, handleError]);

  const fetchAll = useCallback(async (orderBy = 'created_at', ascending = false): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending });

      if (error) throw error;

      setData(result || []);
    } catch (err) {
      handleError(err, 'fetch items');
    } finally {
      setLoading(false);
    }
  }, [table, handleError]);

  const fetchOne = useCallback(async (id: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return result;
    } catch (err) {
      handleError(err, 'fetch item');
      return null;
    } finally {
      setLoading(false);
    }
  }, [table, handleError]);

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    fetchAll,
    fetchOne
  };
}
import { supabase } from "@/lib/supabase";

export interface SubscribeResult {
  ok: boolean;
  already?: boolean;
  error?: string;
}

/**
 * Saves a newsletter subscriber to the `newsletter_subscribers` table.
 * Returns ok=true even when the email already exists (unique violation 23505),
 * flagged with `already: true` so the UI can show a friendly message.
 */
export async function subscribeToNewsletter(
  email: string,
  source = "website",
  firstName?: string
): Promise<SubscribeResult> {
  const { error } = await supabase.from("newsletter_subscribers").insert([
    {
      email: email.trim().toLowerCase(),
      first_name: firstName?.trim() || null,
      source,
      is_active: true
    }
  ]);

  if (error) {
    if (error.code === "23505") {
      return { ok: true, already: true };
    }
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

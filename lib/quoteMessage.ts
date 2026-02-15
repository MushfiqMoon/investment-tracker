import { supabase } from './supabase';
import motivationData from '@/data/motivation.json';

export interface TodaysMessage {
  id: number;
  message: string;
}

export interface QuoteRow {
  id: string;
  message_id: number;
  quote_date: string;
  likes: number;
}

export function getTodaysMessage(): TodaysMessage {
  const day = new Date().getDate();
  const messageId = ((day - 1) % 30) + 1;

  const messages = motivationData.saving_motivation_messages as Array<{ id: number; message: string }>;
  const found = messages.find((m) => m.id === messageId) ?? messages[0];

  return { id: found.id, message: found.message };
}

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function getOrCreateQuoteRow(
  messageId: number,
  date: Date
): Promise<QuoteRow | null> {
  const quoteDate = toISODate(date);

  const { data: existing, error: fetchError } = await supabase
    .from('quote_message')
    .select('*')
    .eq('message_id', messageId)
    .eq('quote_date', quoteDate)
    .maybeSingle();

  if (fetchError) {
    console.error('Error fetching quote row:', fetchError);
    return null;
  }

  if (existing) {
    return existing as QuoteRow;
  }

  const { data: inserted, error: insertError } = await supabase
    .from('quote_message')
    .insert({ message_id: messageId, quote_date: quoteDate, likes: 0 })
    .select()
    .single();

  if (insertError) {
    console.error('Error creating quote row:', insertError);
    return null;
  }

  return inserted as QuoteRow;
}

export async function incrementLikes(messageId: number, date: Date): Promise<number> {
  const quoteDate = toISODate(date);

  const row = await getOrCreateQuoteRow(messageId, date);
  if (!row) return 0;

  const newLikes = row.likes + 1;

  const { error } = await supabase
    .from('quote_message')
    .update({ likes: newLikes })
    .eq('message_id', messageId)
    .eq('quote_date', quoteDate);

  if (error) {
    console.error('Error incrementing likes:', error);
    return row.likes;
  }

  return newLikes;
}

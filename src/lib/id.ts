import { randomUUID } from 'crypto';

export function newId(prefix: string): string {
  return `${prefix}_${randomUUID().replace(/-/g, '').slice(0, 20)}`;
}

export function newShareCode(): string {
  return randomUUID().replace(/-/g, '').slice(0, 10);
}

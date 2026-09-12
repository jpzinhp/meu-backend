'use client';

import { useState } from 'react';

export function CopyButton({ value, label = '📋 Copiar link' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível — ignore silenciosamente
    }
  }

  return (
    <button type="button" onClick={copy} className="btn-secondary">
      {copied ? '✅ Copiado!' : label}
    </button>
  );
}

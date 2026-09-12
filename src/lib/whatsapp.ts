export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Monta um link válido do WhatsApp (wa.me) com mensagem pré-preenchida.
 * Retorna null quando não há telefone — nunca inventamos um número.
 */
export function buildWhatsAppLink(phone: string | undefined, message: string): string | null {
  if (!phone) return null;
  let digits = onlyDigits(phone);
  if (!digits) return null;
  if (!digits.startsWith('55')) {
    digits = `55${digits}`;
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}

export function defaultWhatsAppMessage(companyName: string): string {
  return `Olá! Gostaria de saber mais sobre os serviços da ${companyName}.`;
}

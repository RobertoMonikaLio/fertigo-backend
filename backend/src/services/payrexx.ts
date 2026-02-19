import crypto from 'crypto';

const BASE_URL = 'https://api.payrexx.com/v1.0/';

function getInstance() { return process.env.PAYREXX_INSTANCE || ''; }
function getSecret() { return process.env.PAYREXX_SECRET || ''; }

function buildSignature(bodyString: string): string {
  return crypto
    .createHmac('sha256', getSecret())
    .update(bodyString)
    .digest('base64');
}

function toFormBody(params: Record<string, string>): string {
  return Object.keys(params)
    .sort()
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
}

export async function createGateway(options: {
  amount: number;
  currency?: string;
  successRedirectUrl?: string;
  failedRedirectUrl?: string;
  cancelRedirectUrl?: string;
  referenceId: string;
  purpose?: string;
}): Promise<{ id: number; link: string }> {
  const amountInCents = Math.round(options.amount * 100);

  const params: Record<string, string> = {
    amount: amountInCents.toString(),
    currency: options.currency || 'CHF',
    referenceId: options.referenceId,
    purpose: (options.purpose || 'Fertigo-Guthaben-aufladen').replace(/\s/g, '-'),
  };

  if (options.successRedirectUrl) params.successRedirectUrl = options.successRedirectUrl;
  if (options.failedRedirectUrl) params.failedRedirectUrl = options.failedRedirectUrl;
  if (options.cancelRedirectUrl) params.cancelRedirectUrl = options.cancelRedirectUrl;

  const bodyWithoutSig = toFormBody(params);
  const signature = buildSignature(bodyWithoutSig);
  const fullBody = bodyWithoutSig + '&ApiSignature=' + encodeURIComponent(signature);

  const url = `${BASE_URL}Gateway/?instance=${getInstance()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: fullBody,
  });

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message || 'Payrexx Gateway creation failed');
  }

  return {
    id: data.data[0].id,
    link: data.data[0].link,
  };
}

export async function getGateway(gatewayId: number): Promise<any> {
  const signature = buildSignature('');
  const url = `${BASE_URL}Gateway/${gatewayId}/?instance=${getInstance()}&ApiSignature=${encodeURIComponent(signature)}`;

  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message || 'Failed to get gateway');
  }

  return data.data[0];
}

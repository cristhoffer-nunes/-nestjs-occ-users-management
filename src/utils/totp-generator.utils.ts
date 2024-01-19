// eslint-disable-next-line @typescript-eslint/no-var-requires
const speakeasy = require('speakeasy');

export async function TOTPGenerator(secretKey: string) {
  const currentTime = Math.floor(Date.now() / 1000);
  const totpToken = speakeasy.totp({
    secret: secretKey,
    encoding: 'base32',
    time: currentTime,
  });
  return totpToken;
}

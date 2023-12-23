let id: ArrayBuffer;

export const registerCredentials = async (name: string) => {
  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge: new TextEncoder().encode(crypto.randomUUID()),
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      // requireResidentKey?: boolean;
      // residentKey?: ResidentKeyRequirement;
      // userVerification?: UserVerificationRequirement;
    },
    timeout: 6000,
    attestation: 'direct',
    // excludeCredentials?: PublicKeyCredentialDescriptor[];
    // extensions?: AuthenticationExtensionsClientInputs;
    pubKeyCredParams: [
      {alg: -7, type: "public-key"},
      {alg: -8, type: "public-key"},
      {alg: -257, type: "public-key"},
    ],
    rp: {
      name,
      id: "localhost",
    },
    user: {
      id: new TextEncoder().encode(crypto.randomUUID()),
      name: "test",
      displayName: "Test",
    },
  }

  const passKey = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions,
  }) as PublicKeyCredential;

  console.log('registered passkey: ', passKey);
  id = passKey?.rawId;
}

export const authenticate = async () => {
  const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge: new TextEncoder().encode(crypto.randomUUID()),
    // rpId,
    timeout: 6000,
    allowCredentials: [{
      id,
      type: 'public-key',
      transports: ['internal'],
    }],
    // extensions?: AuthenticationExtensionsClientInputs;
    userVerification: 'required',
  }

  const passKey = await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions,
  });

  console.log('authenticated passkey: ', passKey);
}
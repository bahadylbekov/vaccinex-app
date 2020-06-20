class NuCypherAlice {
    aliceVerKey: string;
    aliceSigKey: string;
}

class NuCypherEnrico {
    message_kit: string;
    signature: string;
}

class NuCypherBob {
    bobVerKey: string;
    bobEncKey: string;
}

export { NuCypherAlice, NuCypherEnrico, NuCypherBob }
interface Client<T extends Record<string, string>, K> {
    actions: (headers: { [key: string]: string }) => K;
}

export const createClient = <T extends Record<string, string>, K>(client: Client<T, K>) => {
    const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
    };

    return client.actions(headers);
};

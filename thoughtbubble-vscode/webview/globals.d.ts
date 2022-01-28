declare global {
  const vscodeGlobal: {
    postMessage: ({ command: string, value: any }) => void;
    getState: () => any;
    setState: (state: any) => void;
  };
}

export {};

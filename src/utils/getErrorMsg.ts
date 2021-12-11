const getErrorMessage = (err: unknown) => (err as { message?: string })?.message ?? 'An unknown error has occurred.';

export default getErrorMessage;

import morgan from 'morgan';

export const httpLogger = () => {
  return morgan
    .token('headers', (req) => JSON.stringify(req.headers))
    .token('protocol', (req) => req.protocol)
    .token(
      'host',
      (req) => req.get('host')!,
    )(
    ':headers:\n:protocol :host :method :url :status :res[content-length] - :response-time ms',
  );
};

export const storeLogger = (message: string, subject: string) => {
  return `${message} ${subject}`;
};

export const managerLogger = (message: string, subject: string) => {
  return `${message} ${subject}`;
};

export const graphQlLogger = (message: string, subject: string) => {
  return `${message} ${subject}`;
};

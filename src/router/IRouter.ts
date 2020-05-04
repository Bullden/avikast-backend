export const Routes = {
  login: {
    prefix: 'login',
  },
};

export type Absolute = {
  baseUrl: string;
};

type RouteOptions = {
  absolute?: Absolute;
};

export default abstract class IRouter {}

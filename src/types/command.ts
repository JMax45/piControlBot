import { Context } from 'telegraf';
import Byteroo, { Container } from 'byteroo';

type params = {
  admins: Container;
  storage: Byteroo;
};

type command = {
  name: string;
  description?: string;
  public?: boolean;
  access?: string;
  execute: (ctx: Context, params: params) => void;
};

export default command;

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnviromentDocument = HydratedDocument<Environment>;
@Schema()
export class Environment {
  @Prop()
  customer: string;

  @Prop()
  environment: string;

  @Prop()
  url: string;

  @Prop()
  appKey: string | null;

  @Prop()
  adminKey: string | null;

  @Prop()
  totp_code: string | null;

  @Prop()
  active: boolean;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const EnvironmentSchema = SchemaFactory.createForClass(Environment);

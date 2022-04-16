import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppuserDocument = Appuser & Document;

@Schema()
export class Appuser {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const AppuserSchema = SchemaFactory.createForClass(Appuser);

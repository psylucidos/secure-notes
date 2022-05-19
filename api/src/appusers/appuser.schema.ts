import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AppuserDocument = Appuser & mongoose.Document;

@Schema()
export class Appuser {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const AppuserSchema = SchemaFactory.createForClass(Appuser);

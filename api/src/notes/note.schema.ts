import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Appuser } from '../appusers/appuser.schema';

export type NoteDocument = Note & mongoose.Document;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appuser' })
  owner: Appuser;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

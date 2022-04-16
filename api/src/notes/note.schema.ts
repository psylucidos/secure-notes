import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Owner } from '../appusers/appuser.schema';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appuser' })
  owner: Owner;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

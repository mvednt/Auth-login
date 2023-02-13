import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';

 
export type UserDocument = User & Document;
 
@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
 
  @Prop()
  username: string;
 
  @Prop()
  password: string;
 
}
 
export const UserSchema = SchemaFactory.createForClass(User);
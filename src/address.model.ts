import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
//import { Transform } from 'class-transformer';
 
//export type AddressDocument = Address & Document;
 
// @Schema({ collection: "user_address", timestamps: true })
// export class UserAddress extends Document {
 
 
//   @Prop({})
//   present_address: string;

//   @Prop({})
//   user_id: string;
 
// }
 
export type UserAddressDocument = UserAddress & Document;
@Schema()
export class UserAddress {
  @Prop()
  present_address: string;

  @Prop()
  user_id: string;


}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);

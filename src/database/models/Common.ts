import {Schema, SchemaDefinition} from 'mongoose';
import {ModelDefinition} from '@nestjs/mongoose';

export const createSchema = (
  name: string,
  definition: SchemaDefinition,
): ModelDefinition => ({
  name,
  schema: new Schema(definition),
});

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
    //id:
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    authors: string;

    @Prop({ required: true })
    source: string;

    @Prop({ required: true })
    pubyear: string;

    @Prop({ required: true })
    doi: string;

    @Prop()
    claim: string;

    @Prop()
    evidence: string;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);

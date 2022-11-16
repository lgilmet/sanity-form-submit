import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import application from "./application";
import polaroid from "./polaroid";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([application, polaroid]),
});

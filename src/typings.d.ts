// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var moment: any;

declare function JSONPath(obj: any): any

declare module "strong-pubsub-mqtt" {

}

declare module "duplex" {
  export default function duplex();
}

declare module "stream-browserify" {

}

declare module "util" {

}

declare module "url" {

}

declare module "Window" {
  export var Primus: any;
}

declare module "*.json" {
  const value: any;
  export default value;
}

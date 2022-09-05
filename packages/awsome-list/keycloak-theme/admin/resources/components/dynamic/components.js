import {StringComponent} from "./StringComponent.js";
import {BooleanComponent} from "./BooleanComponent.js";
import {ListComponent} from "./ListComponent.js";
import {RoleComponent} from "./RoleComponent.js";
import {MapComponent} from "./MapComponent.js";
import {ScriptComponent} from "./ScriptComponent.js";
import {ClientSelectComponent} from "./ClientSelectComponent.js";
import {MultiValuedStringComponent} from "./MultivaluedStringComponent.js";
import {MultiValuedListComponent} from "./MultivaluedListComponent.js";
import {GroupComponent} from "./GroupComponent.js";
import {FileComponent} from "./FileComponent.js";
const ComponentTypes = [
  "String",
  "boolean",
  "List",
  "Role",
  "Script",
  "Map",
  "Group",
  "MultivaluedList",
  "ClientList",
  "MultivaluedString",
  "File"
];
export const COMPONENTS = {
  String: StringComponent,
  boolean: BooleanComponent,
  List: ListComponent,
  Role: RoleComponent,
  Script: ScriptComponent,
  Map: MapComponent,
  Group: GroupComponent,
  ClientList: ClientSelectComponent,
  MultivaluedList: MultiValuedListComponent,
  MultivaluedString: MultiValuedStringComponent,
  File: FileComponent
};
export const isValidComponentType = (value) => value in COMPONENTS;

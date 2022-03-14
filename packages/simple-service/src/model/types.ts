/* eslint-disable @typescript-eslint/no-empty-interface */
// we must import declaration
import './gateway';
import './main';
// this is just a type placeholder for each sequelize model definition to inject property.
// Please refer ./gateway/Agent
export interface AppModels {

}

// Other model classes are injected from definitin file
// Please refer example from './gateway/Agent
/**
 * declare module '../types' {
 *   interface AppModels {
 *     Agent: typeof Agent
 *   }
 *   type AgentModel = Agent;
 * }
 * 
 * 
 */
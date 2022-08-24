// const LDPNavigator = require('./LDPNavigator');
import LDPNavigator from './LDPNavigator.js'
import FetchAdapter from './adapter/FetchAdapter.js'
import SparqlAdapter from './adapter//SparqlAdapter.js'
import LDPNavigator_SparqlAndFetch_Factory from './LDPNavigator_SparqlAndFetch_Factory.js'
//
// module.exports = {
//     default:LDPNavigator,
//     LDPNavigator
// };

export default LDPNavigator;
export {LDPNavigator,FetchAdapter,SparqlAdapter,LDPNavigator_SparqlAndFetch_Factory}

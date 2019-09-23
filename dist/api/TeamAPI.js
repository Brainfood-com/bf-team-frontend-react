import _Object$defineProperty from "@babel/runtime-corejs3/core-js/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js/object/get-own-property-descriptors";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js/instance/for-each";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js/object/get-own-property-descriptor";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js/instance/filter";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js/object/get-own-property-symbols";
import _Object$keys from "@babel/runtime-corejs3/core-js/object/keys";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _JSON$stringify from "@babel/runtime-corejs3/core-js/json/stringify";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; _forEachInstanceProperty(_context = ownKeys(source, true)).call(_context, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context2; _forEachInstanceProperty(_context2 = ownKeys(source)).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { moquiApi, withModelApi } from 'bf-moqui-frontend-react';
export function extractTeamKey(props) {
  return props.partyId;
}
export function fetchTeam(partyId) {
  return moquiApi('/bf-team/team/' + partyId);
}
export function processTeamResult(result) {
  var team = result.team;
  return {
    team: team
  };
}
export function extractTeamsKey(props) {
  return props.partyId;
}
export function fetchTeams(partyId) {
  return moquiApi('/bf-team/teams/' + partyId);
}
export function processTeamsResult(result) {
  var teams = result.teams;
  return {
    teams: teams
  };
}
export function sendTeamInvite(team, context) {
  return moquiApi('/bf-team/invite', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: _JSON$stringify(_objectSpread({}, context, {
      partyId: team.partyId
    }))
  }).then(function (result) {
    console.log('result', result);
  });
}
export var withTeam = withModelApi({
  extractKey: extractTeamKey,
  fetchModel: fetchTeam,
  processResult: processTeamResult
});
export var withTeams = withModelApi({
  extractKey: extractTeamsKey,
  fetchModel: fetchTeams,
  processResult: processTeamsResult
});
//# sourceMappingURL=TeamAPI.js.map
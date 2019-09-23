import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

var _class, _temp, _class2, _temp2;

import PropTypes from 'prop-types';
import React from 'react';
import { PartyName, PartyIcon } from 'bf-party-frontend-react';
export var TeamMemberShape = PropTypes.shape({
  memberPartyId: PropTypes.string.isRequired,
  roleTypes: PropTypes.arrayOf(PropTypes.string)
});
export var SimpleTeamShape = PropTypes.shape({
  partyId: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
  teamName: PropTypes.string,
  userRoleTypes: PropTypes.arrayOf(PropTypes.string)
});
export var TeamShape = PropTypes.shape({
  partyId: PropTypes.string.isRequired,
  partyTypeEnumId: PropTypes.oneOf(['Team']),
  profilePic: PropTypes.string,
  teamName: PropTypes.string,
  members: PropTypes.arrayOf(TeamMemberShape),
  userRoleTypes: PropTypes.arrayOf(PropTypes.string)
});
export var TeamIcon = PartyIcon.register((_temp = _class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeamIcon, _React$Component);

  function TeamIcon() {
    _classCallCheck(this, TeamIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(TeamIcon).apply(this, arguments));
  }

  _createClass(TeamIcon, [{
    key: "render",
    value: function render() {
      return React.createElement(GroupIcon, null);
    }
  }]);

  return TeamIcon;
}(React.Component), _defineProperty(_class, "partyTypeEnumId", 'Team'), _defineProperty(_class, "propTypes", {
  party: TeamShape.isRequired
}), _temp));
export var TeamName = PartyName.register((_temp2 = _class2 =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(TeamName, _React$Component2);

  function TeamName() {
    _classCallCheck(this, TeamName);

    return _possibleConstructorReturn(this, _getPrototypeOf(TeamName).apply(this, arguments));
  }

  _createClass(TeamName, [{
    key: "render",
    value: function render() {
      var party = this.props.party;
      return React.createElement(Typography, null, party.teamName);
    }
  }]);

  return TeamName;
}(React.Component), _defineProperty(_class2, "partyTypeEnumId", 'Team'), _defineProperty(_class2, "propTypes", {
  party: TeamShape.isRequired
}), _temp2));
//# sourceMappingURL=TeamModel.js.map
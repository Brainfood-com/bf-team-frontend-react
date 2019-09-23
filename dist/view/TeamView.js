import "core-js/modules/es.function.name";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js/instance/map";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js/instance/index-of";
import _extends from "@babel/runtime-corejs3/helpers/extends";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js/instance/concat";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

var _class, _temp, _class2, _temp2;

import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withTeam, withTeams, sendTeamInvite } from '../api/TeamAPI';
import { SimpleTeamShape, TeamShape } from '../model/TeamModel';
export var InviteUser =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InviteUser, _React$Component);

  function InviteUser() {
    var _getPrototypeOf2, _context;

    var _this;

    _classCallCheck(this, InviteUser);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InviteUser)).call.apply(_getPrototypeOf2, _concatInstanceProperty(_context = [this]).call(_context, args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      emailAddress: ''
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnChange", function (ev) {
      var target = ev.target;
      var name = target.name,
          value = target.value;

      _this.setState(_defineProperty({}, name, value));
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnClose", function () {
      var onInvite = _this.props.onInvite;
      onInvite(false);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInvite", function () {
      var _this$props = _this.props,
          onInvite = _this$props.onInvite,
          team = _this$props.team;
      var emailAddress = _this.state.emailAddress;
      onInvite({
        team: team,
        emailAddress: emailAddress
      });
    });

    return _this;
  }

  _createClass(InviteUser, [{
    key: "render",
    value: function render() {
      var team = this.props.team;
      var emailAddress = this.state.emailAddress;
      return React.createElement(Dialog, {
        open: true
      }, React.createElement(DialogTitle, null, "Invite User: ", team.teamName), React.createElement(DialogContent, null, React.createElement(Typography, null, "[add user search box]"), React.createElement(FormControl, null, React.createElement(TextField, {
        name: "emailAddress",
        value: emailAddress,
        onChange: this.handleOnChange
      }))), React.createElement(DialogActions, null, React.createElement(Button, {
        onClick: this.handleOnClose
      }, "Cancel"), React.createElement(Button, {
        onClick: this.handleInvite
      }, "Send invite")));
    }
  }]);

  return InviteUser;
}(React.Component);

_defineProperty(InviteUser, "propTypes", {
  team: TeamShape.isRequired,
  onInvite: PropTypes.func
});

_defineProperty(InviteUser, "defaultProps", {
  onInvite: function onInvite(result) {}
});

export var withTeamInviteTo = function withTeamInviteTo(options) {
  return function (Component) {
    return function (_ref) {
      var onInviteRequest = _ref.onInviteRequest,
          props = _objectWithoutProperties(_ref, ["onInviteRequest"]);

      var _React$useState = React.useState(undefined),
          _React$useState2 = _slicedToArray(_React$useState, 2),
          inviteTo = _React$useState2[0],
          setInviteTo = _React$useState2[1];

      var handleOnInvite = function handleOnInvite(result) {
        if (result) {
          var team = result.team,
              context = _objectWithoutProperties(result, ["team"]);

          sendTeamInvite(team, context);
        }

        setInviteTo(null);
      };

      var handleInviteRequest = function handleInviteRequest(team) {
        setInviteTo(team);
      };

      return React.createElement("div", null, React.createElement(Component, _extends({}, props, {
        onInviteRequest: onInviteRequest || handleInviteRequest
      })), inviteTo && React.createElement(InviteUser, {
        team: inviteTo,
        onInvite: handleOnInvite
      }));
    };
  };
};
export var Team = withTeamInviteTo()(withTeam((_temp = _class =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Team, _React$Component2);

  function Team() {
    _classCallCheck(this, Team);

    return _possibleConstructorReturn(this, _getPrototypeOf(Team).apply(this, arguments));
  }

  _createClass(Team, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          onInviteRequest = _this$props2.onInviteRequest,
          isLoading = _this$props2.isLoading,
          team = _this$props2.team;

      if (isLoading) {
        return React.createElement("div", null, "Loading");
      }

      var partyId = team.partyId,
          teamName = team.teamName,
          members = team.members,
          userPartyRoles = team.userPartyRoles;
      var isOwner = _indexOfInstanceProperty(userPartyRoles).call(userPartyRoles, 'Owner') !== -1;
      var isAdmin = _indexOfInstanceProperty(userPartyRoles).call(userPartyRoles, 'Admin') !== -1;
      return React.createElement(Paper, null, React.createElement("h3", null, teamName), (isOwner || isAdmin) && React.createElement(Button, {
        onClick: function onClick() {
          return onInviteRequest(team);
        }
      }, "Invite/Add Member"), React.createElement("h6", null, "Team Members"), React.createElement(List, null, _mapInstanceProperty(members).call(members, function (member) {
        var memberPartyId = member.memberPartyId,
            roleTypes = member.roleTypes;
        return React.createElement(ListItem, {
          key: memberPartyId
        }, React.createElement(ListItemIcon, null, "[foo]"), React.createElement(ListItemText, {
          primary: memberPartyId,
          secondary: 'roles'
        }));
      })));
    }
  }]);

  return Team;
}(React.Component), _defineProperty(_class, "propTypes", {
  onInviteRequest: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  team: TeamShape
}), _defineProperty(_class, "defaultProps", {
  onInviteRequest: function onInviteRequest() {}
}), _temp)));
export var Teams = withTeamInviteTo()(withTeams((_temp2 = _class2 =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Teams, _React$Component3);

  function Teams() {
    _classCallCheck(this, Teams);

    return _possibleConstructorReturn(this, _getPrototypeOf(Teams).apply(this, arguments));
  }

  _createClass(Teams, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          onInviteRequest = _this$props3.onInviteRequest,
          isLoading = _this$props3.isLoading,
          teams = _this$props3.teams;

      if (isLoading) {
        return React.createElement("div", null, "Loading");
      }

      console.log('teams', teams);

      var renderTeamText = function renderTeamText(team) {
        var _this2$props = _this2.props,
            visitTeamLink = _this2$props.visitTeamLink,
            visitTeam = _this2$props.visitTeam;
        var teamText = React.createElement(ListItemText, {
          primary: team.teamName
        });

        if (visitTeamLink) {
          return React.createElement(ListItem, {
            button: true,
            component: "a",
            href: visitTeamLink(team)
          }, teamText);
        } else if (visitTeam) {
          return React.createElement(ListItem, {
            button: true,
            onClick: function onClick() {
              return visitTeam(team);
            }
          }, teamText);
        } else {
          return teamText;
        }
      };

      return React.createElement(Paper, null, React.createElement("h3", null, "Teams"), React.createElement(List, null, _mapInstanceProperty(teams).call(teams, function (team) {
        var partyId = team.partyId,
            teamName = team.teamName,
            profilePic = team.profilePic,
            userPartyRoles = team.userPartyRoles;
        var isOwner = _indexOfInstanceProperty(userPartyRoles).call(userPartyRoles, 'Owner') !== -1;
        var isAdmin = _indexOfInstanceProperty(userPartyRoles).call(userPartyRoles, 'Admin') !== -1; //<Team partyId={partyId}/>

        return React.createElement(ListItem, {
          key: partyId
        }, React.createElement(ListItemAvatar, null, React.createElement(Avatar, null, profilePic && React.createElement("img", {
          src: profilePic
        }))), renderTeamText(team), React.createElement(ListItemSecondaryAction, null, (isOwner || isAdmin) && React.createElement(Button, {
          onClick: function onClick() {
            return onInviteRequest(team);
          }
        }, "Invite/Add Member")));
      })));
    }
  }]);

  return Teams;
}(React.Component), _defineProperty(_class2, "propTypes", {
  visitTeamLink: PropTypes.func,
  visitTeam: PropTypes.func,
  onInviteRequest: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  teams: PropTypes.arrayOf(SimpleTeamShape)
}), _temp2)));
//# sourceMappingURL=TeamView.js.map
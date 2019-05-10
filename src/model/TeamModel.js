import PropTypes from 'prop-types'
import React from 'react'

import {PartyName, PartyIcon} from 'bf-party-frontend-react'

export const TeamMemberShape = PropTypes.shape({
  memberPartyId: PropTypes.string.isRequired,
  roleTypes: PropTypes.arrayOf(PropTypes.string),
})
export const SimpleTeamShape = PropTypes.shape({
  partyId: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
  teamName: PropTypes.string,
  userRoleTypes: PropTypes.arrayOf(PropTypes.string),
})
export const TeamShape = PropTypes.shape({
  partyId: PropTypes.string.isRequired,
  partyTypeEnumId: PropTypes.oneOf(['Team']),
  profilePic: PropTypes.string,
  teamName: PropTypes.string,
  members: PropTypes.arrayOf(TeamMemberShape),
  userRoleTypes: PropTypes.arrayOf(PropTypes.string),
})

export const TeamIcon = PartyIcon.register(class TeamIcon extends React.Component {
  static partyTypeEnumId = 'Team'
  static propTypes = {
    party: TeamShape.isRequired,
  }
  render() {
    return <GroupIcon/>
  }
})

export const TeamName = PartyName.register(class TeamName extends React.Component {
  static partyTypeEnumId = 'Team'
  static propTypes = {
    party: TeamShape.isRequired,
  }
  render() {
    const {party} = this.props
    return <Typography>{party.teamName}</Typography>
  }
})

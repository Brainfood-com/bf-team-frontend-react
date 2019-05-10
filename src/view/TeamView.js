import PropTypes from 'prop-types'
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import {withTeam, withTeams, sendTeamInvite} from  '../api/TeamAPI'

import {SimpleTeamShape, TeamShape} from '../model/TeamModel'

export class InviteUser extends React.Component {
  static propTypes = {
    team: TeamShape.isRequired,
    onInvite: PropTypes.func,
  }

  static defaultProps = {
    onInvite(result) {},
  }

  state = {
    emailAddress: '',
  }

  handleOnChange = ev => {
    const {target} = ev
    const {name, value} = target
    this.setState({[name]: value})
  }

  handleOnClose = () => {
    const {onInvite} = this.props
    onInvite(false)
  }

  handleInvite = () => {
    const {onInvite, team} = this.props
    const {emailAddress} = this.state
    onInvite({team, emailAddress})
  }

  render() {
    const {team} = this.props
    const {emailAddress} = this.state
    return <Dialog open={true}>
      <DialogTitle>Invite User: {team.teamName}</DialogTitle>
      <DialogContent>
        <Typography>[add user search box]</Typography>
        <FormControl>
          <TextField name='emailAddress' value={emailAddress} onChange={this.handleOnChange}/>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleOnClose}>Cancel</Button>
        <Button onClick={this.handleInvite}>Send invite</Button>
      </DialogActions>
    </Dialog>
  }
}

export const withTeamInviteTo = options => {
  return Component => ({onInviteRequest, ...props}) => {
    const [inviteTo, setInviteTo] = React.useState(undefined)
    const handleOnInvite = result => {
      if (result) {
        const {team, ...context} = result
        sendTeamInvite(team, context)
      }
      setInviteTo(null)
    }
    const handleInviteRequest = team => {
      setInviteTo(team)
    }

    return <div>
      <Component {...props} onInviteRequest={onInviteRequest || handleInviteRequest}/>
      {inviteTo && <InviteUser team={inviteTo} onInvite={handleOnInvite}/>}
    </div>
  }
}

export const Team = withTeamInviteTo()(withTeam(class Team extends React.Component {
  static propTypes = {
    onInviteRequest: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    team: TeamShape,
  }

  static defaultProps = {
    onInviteRequest() {},
  }

  render() {
    const {onInviteRequest, isLoading, team} = this.props
    if (isLoading) {
      return <div>Loading</div>
    }

    const {
      partyId,
      teamName,
      members,
      userPartyRoles,
    } = team
    const isOwner = userPartyRoles.indexOf('Owner') !== -1
    const isAdmin = userPartyRoles.indexOf('Admin') !== -1
    return <Paper>
      <h3>{teamName}</h3>
      {(isOwner || isAdmin) && <Button onClick={() => onInviteRequest(team)}>Invite/Add Member</Button>}
      <h6>Team Members</h6>
      <List>
        {members.map(member => {
          const {memberPartyId, roleTypes} = member
          return <ListItem key={memberPartyId}>
            <ListItemIcon>[foo]</ListItemIcon>
            <ListItemText primary={memberPartyId} secondary={'roles'}/>
          </ListItem>
        })}
      </List>
    </Paper>
  }
}))

export const Teams = withTeamInviteTo()(withTeams(class Teams extends React.Component {
  static propTypes = {
    visitTeamLink: PropTypes.func,
    visitTeam: PropTypes.func,
    onInviteRequest: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    teams: PropTypes.arrayOf(SimpleTeamShape),
  }

  render() {
    const {onInviteRequest, isLoading, teams} = this.props
    if (isLoading) {
      return <div>Loading</div>
    }
    console.log('teams', teams)
    const renderTeamText = team => {
      const {visitTeamLink, visitTeam} = this.props
      const teamText = <ListItemText primary={team.teamName}/>
      if (visitTeamLink) {
        return <ListItem button component='a' href={visitTeamLink(team)}>{teamText}</ListItem>
      } else if (visitTeam) {
        return <ListItem button onClick={() => visitTeam(team)}>{teamText}</ListItem>
      } else {
        return teamText
      }
    }
   return <Paper>
      <h3>Teams</h3>
      <List>
        {teams.map(team => {
          const {partyId, teamName, profilePic, userPartyRoles} = team
          const isOwner = userPartyRoles.indexOf('Owner') !== -1
          const isAdmin = userPartyRoles.indexOf('Admin') !== -1
            //<Team partyId={partyId}/>
          return <ListItem key={partyId}>
            <ListItemAvatar><Avatar>{profilePic && <img src={profilePic}/>}</Avatar></ListItemAvatar>
            {renderTeamText(team)}
            <ListItemSecondaryAction>
              {(isOwner || isAdmin) && <Button onClick={() => onInviteRequest(team)}>Invite/Add Member</Button>}
            </ListItemSecondaryAction>
          </ListItem>
        })}
      </List>
    </Paper>
  }
}))

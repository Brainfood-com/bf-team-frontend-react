import {moquiApi, withModelApi} from 'bf-moqui-frontend-react'

export function extractTeamKey(props) {
  return props.partyId
}

export function fetchTeam(partyId) {
  return moquiApi('/bf-team/team/' + partyId)
}

export function processTeamResult(result) {
  const {team} = result
  return {team}
}

export function extractTeamsKey(props) {
  return props.partyId
}

export function fetchTeams(partyId) {
  return moquiApi('/bf-team/teams/' + partyId)
}

export function processTeamsResult(result) {
  const {teams} = result
  return {teams}
}

export function sendTeamInvite(team, context) {
  return moquiApi('/bf-team/invite', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...context, partyId: team.partyId}),
  }).then(result => {
    console.log('result', result)
  })
}

export const withTeam = withModelApi({
  extractKey: extractTeamKey,
  fetchModel: fetchTeam,
  processResult: processTeamResult,
})

export const withTeams = withModelApi({
  extractKey: extractTeamsKey,
  fetchModel: fetchTeams,
  processResult: processTeamsResult,
})


import { createActionStringObjects } from '../../../helpers/utils';

export const dotaActions = createActionStringObjects([
  'GET_DOTA_DATA',
  'GET_DOTA_LEAGUES_REQUEST',
  'GET_DOTA_LEAGUES_SUCCESS',
  'GET_DOTA_LEAGUES_FAILURE',
  'GET_DOTA_PRO_MATCHES_REQUEST',
  'GET_DOTA_PRO_MATCHES_SUCCESS',
  'GET_DOTA_PRO_MATCHES_FAILURE',
  'GET_DOTA_TEAMS_REQUEST',
  'GET_DOTA_TEAMS_SUCCESS',
  'GET_DOTA_TEAMS_FAILURE',
]);

export const nbaActions = createActionStringObjects([
  'GET_NBA_SCHEDULE_REQUEST',
  'GET_NBA_SCHEDULE_SUCCESS',
  'GET_NBA_SCHEDULE_FAILURE',
  'GET_NBA_TEAMS_REQUEST',
  'GET_NBA_TEAMS_SUCCESS',
  'GET_NBA_TEAMS_FAILURE',
  'GET_NBA_VIDEOS_REQUEST',
  'GET_NBA_VIDEOS_SUCCESS',
  'GET_NBA_VIDEOS_FAILURE'
]);

export const eplActions = createActionStringObjects([
  'GET_EPL_SCHEDULE_REQUEST',
  'GET_EPL_SCHEDULE_SUCCESS',
  'GET_EPL_SCHEDULE_FAILURE',
  'GET_EPL_TEAMS_REQUEST',
  'GET_EPL_TEAMS_SUCCESS',
  'GET_EPL_TEAMS_FAILURE',
  'GET_EPL_VIDEOS_REQUEST',
  'GET_EPL_VIDEOS_SUCCESS',
  'GET_EPL_VIDEOS_FAILURE'
]);

export const championsLeagueActions = createActionStringObjects([
  'GET_CHAMPIONS_LEAGUE_VIDEOS_REQUEST',
  'GET_CHAMPIONS_LEAGUE_VIDEOS_SUCCESS',
  'GET_CHAMPIONS_LEAGUE_VIDEOS_FAILURE'
]);

export const europaLeagueActions = createActionStringObjects([
  'GET_EUROPA_LEAGUE_VIDEOS_REQUEST',
  'GET_EUROPA_LEAGUE_VIDEOS_SUCCESS',
  'GET_EUROPA_LEAGUE_VIDEOS_FAILURE'
]);

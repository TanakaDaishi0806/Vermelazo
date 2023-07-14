import internal from "stream";

export interface LoginInfo {
  student_id: string;
  password: string;
  student_idEmpty: boolean;
  passwordEmpty: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleStudent_idChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
}

export interface NewAccountInfo {
  name: string;
  furigana: string;
  student_id: string;
  password: string;
  confirmPassword: string;
  mailaddress: string;
  grade: number;
  position: number;
  experience: number;
  nameEmpty: boolean;
  furiganaEmpty: boolean;
  student_idError: boolean;
  passwordLengthError: boolean;
  passwordError: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFuriganaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStudent_idChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleMailaddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGradeChange: (event: SelectChangeEvent<string>) => void;
  handlePositionChange: (event: SelectChangeEvent<string>) => void;
  handleExperienceChange: (event: SelectChangeEvent<string>) => void;
  handleNewAccountCreate: () => void;
}

export interface HeaderText {
  text: string;
}

export interface ClubMatchGetData {
  club_match_id: number;
  year: number;
  month: number;
  day: number;
  vote_year: number;
  vote_month: number;
  vote_day: number;
  title: string;
  is_released: number;
  isAdmin: boolean;
  is_participant: boolean;
  participant_num: number;
  is_create_team: boolean;
  is_add_match: boolean;
  is_finish: boolean;
  set: React.Dispatch<React.SetStateAction<ClubMatchGetData[]>>;
}

export interface BaseButtonInfo {
  buttonText: string;
  onClick: () => void;
  width: string;
  height: string;
  mt: string;
  mb: string;
}

export interface ColorButtonInfo {
  buttonText: string;
  onClick: () => void;
  buttonColor: OverridableStringUnion<
    | "inherit"
    | "info"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning",
    ButtonPropsColorOverrides
  >;
  mt: string;
  mb: string;
}

export interface DateValue {
  date: Date | null;
  calenderText: string;
  handleDateChange: (dateValue: Date | null) => void;
}

export interface AddClubMatchInfo {
  date: Date | null;
  voteDate: Date | null;
  title: string;
  dateEmpty: boolean;
  voteDateEmpty: boolean;
  titleEmpty: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleDateChange: (dateValue: Date | null) => void;
  handleVoteDateChange: (dateValue: Date | null) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateSubmit: () => void;
}

export interface ChangeClubMatchInfo {
  date: Date | null;
  voteDate: Date | null;
  title: string;
  dateEmpty: boolean;
  voteDateEmpty: boolean;
  titleEmpty: boolean;
  inputError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleDateChange: (dateValue: Date | null) => void;
  handleVoteDateChange: (dateValue: Date | null) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDateSubmit: () => void;
}

export interface GetURL {
  url: string;
  isAdmin: boolean;
}

export interface CreateTeamInfo {
  teamNum: string;
  teamNumEmpty: boolean;
  allEmptyError: boolean;
  handleTeamNumChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateTeamDataSubmit: () => void;
}

export interface TeamMember {
  team_id: number;
  club_match_id: number;
  user_id: number;
  name: string;
  furigana: string;
  position: number;
  experience: number;
}

export interface TeamMemberListInfo {
  teamMemberList: TeamMember[][];
  club_match_id: number;
  vnum: number;
  setTeamMemberList: React.Dispatch<React.SetStateAction<TeamMember[][]>>;
  handleCreateTeamNaviaget: () => void;
}

export interface ClubMatchID {
  club_match_id: number;
}

export interface TeamSelectBoxInfo {
  teamNum: number;
  defaultNum: number;
  handleTeamNameSideChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export interface ChangeMember {
  changeTeamID: number;
  userID: number;
}

export interface CreateMatchInfo {
  matchNum: string;
  matchNumEmpty: boolean;
  allEmptyError: boolean;
  handleMatchNumChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateMatchDataSubmit: () => void;
}

export interface MatchGetData {
  match_id: number;
  club_match_id: number;
  team_id_a: number;
  team_id_b: number;
  score_a: number;
  score_b: number;
  is_resister: boolean;
}

export interface MatchListInfo {
  rightSpace: (b: boolean) => JSX.Element;
  club_match_id: number;
}

export interface ChangeMatchListInfo {
  matchListInfo: MatchListInfo;
  handleCreateMatchList: () => void;
  handleHome: () => void;
}

export interface AddScoreMatchListInfo {
  club_match_id: number;
}

export interface AddScoreInfo {
  club_match_id: number;
  match_id: number;
  team_id_a: number;
  team_id_b: number;
  team_name_a: number;
  team_name_b: number;
  score_a: string;
  score_b: string;
  handleScoreAChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleScoreBChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AddMatchResultInfo {
  club_match_id: number;
  match_id: number;
  team_id_a: number;
  team_id_b: number;
  team_name_a: number;
  team_name_b: number;
  score_a: string;
  score_b: string;
  teamAMember: TeamMember[];
  teamBMember: TeamMember[];
  pointGetterA: TeamMember[];
  pointGetterB: TeamMember[];
  pointA: number[];
  pointB: number[];
  submitError: boolean;
  handleScoreAChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleScoreBChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlusPointGetterAChange: (value: TeamMember) => () => void;
  handlePlusPointGetterBChange: (value: TeamMember) => () => void;
  handleMinusPointGetterAChange: (value: TeamMember) => () => void;
  handleMinusPointGetterBChange: (value: TeamMember) => () => void;
  handlesubmit: () => void;
}

export interface TextItemInfo {
  itemText: string;
}

export interface SelectPointGetterInfo {
  teamAMember: TeamMember[];
  teamBMember: TeamMember[];
  pointGetterA: TeamMember[];
  pointGetterB: TeamMember[];
  pointA: number[];
  pointB: number[];
  handlePlusPointGetterAChange: (value: TeamMember) => () => void;
  handlePlusPointGetterBChange: (value: TeamMember) => () => void;
  handleMinusPointGetterAChange: (value: TeamMember) => () => void;
  handleMinusPointGetterBChange: (value: TeamMember) => () => void;
}

export interface EachPositionMom {
  positionText: string;
  getUrlPositionMember: string;
  getUrlPositionMom: string;
  postUrl: string;
  toUrl: string;
  club_match_id: number;
  position: number;
}

export interface PositionMom {
  club_match_id: number;
  user_id: number;
  name: string;
  furigana: string;
  position: number;
  experience: number;
}

export interface FooterValue {
  vnum: number;
}

export interface MyVoteBool {
  club_match_id: number;
  user_id: number;
  match_id: number;
  team_id: number;
  is_vote: boolean;
}

export interface VoteKind {
  vote_kind_num: boolean;
}

export interface MyVoteInfo {
  club_match_id: number;
  user_id: number;
  match_id: number;
  team_id: number;
}

export interface MyTeamVoteInfo {
  text: string;
  getUrlMyTeam: string;
  postUrl: string;
  toUrl: string;
  club_match_id: number;
  user_id: number;
  match_id: number;
}

export interface ResisterMatchVoteInfo {
  club_match_id: number;
  match_id: number;
  team_id_a: number;
  team_id_b: number;
  team_name_a: string;
  team_name_b: string;
  user_id: number;
}

export interface MatchVoteInfo {
  text: string;
  getUrlTeamA: string;
  getUrlTeamB: string;
  team_name_a: string;
  team_name_b: string;
  postUrl: string;
  toUrl: string;
  club_match_id: number;
  user_id: number;
  match_id: number;
}

export interface ResultPageInfo {
  club_match_id: number;
  is_finish: boolean;
}

export interface TeamRankListData {
  team_id: number;
  club_match_id: number;
  point: number;
  match_num: number;
  win_num: number;
  draw_num: number;
  lose_num: number;
  goal_num: number;
  is_last_rank: boolean;
}

export interface EachMatchMomMember {
  user_id: number;
  name: string;
  furigana: string;
}

export interface ResultDetailInfo {
  team_name_a: string;
  team_name_b: string;
  score_a: number;
  score_b: number;
  pointGetterB: TeamMember[];
  pointGetterA: TeamMember[];
  mom: EachMatchMomMember[];
  is_finish: boolean;
  vnum: number;
  handleResultListNavigate: () => void;
}

export interface TopScorerData {
  name: string;
  furigana: string;
  goal_num: number;
}

export interface MyRankData {
  rank_all: number;
  total_all: number;
  rank_position: number;
  total_position: number;
  rank_experience: number;
  total_experience: number;
  goal_num: number;
  rank_goal: number;
  total_goal: number;
  is_released: number;
}

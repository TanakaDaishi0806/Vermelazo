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
  confirmPasswordEmpty: boolean;
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
  point_times: number;
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
  pointTimes: string;
  dateEmpty: boolean;
  voteDateEmpty: boolean;
  titleEmpty: boolean;
  pointTimesEmpty: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleDateChange: (dateValue: Date | null) => void;
  handleVoteDateChange: (dateValue: Date | null) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePointTimesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateSubmit: () => void;
}

export interface ChangeClubMatchInfo {
  date: Date | null;
  voteDate: Date | null;
  title: string;
  pointTimes: string;
  dateEmpty: boolean;
  voteDateEmpty: boolean;
  titleEmpty: boolean;
  pointTimesEmpty: boolean;
  inputError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleDateChange: (dateValue: Date | null) => void;
  handleVoteDateChange: (dateValue: Date | null) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePointTimesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  grade: number;
}

export interface TeamMemberWithAward {
  team_id: number;
  club_match_id: number;
  user_id: number;
  name: string;
  furigana: string;
  position: number;
  experience: number;
  grade: number;
  award_num: number;
}

export interface TeamMemberListInfo {
  teamMemberList: TeamMemberWithAward[][];
  club_match_id: number;
  vnum: number;
  setTeamMemberList: React.Dispatch<
    React.SetStateAction<TeamMemberWithAward[][]>
  >;
  handleCreateTeamNaviaget: () => void;
}

export interface InterimResultInfo {
  club_match_id: number;
  vnum: number;
}

export interface TeamSelectBoxInfo {
  teamNum: number;
  defaultNum: number;
  handleTeamNameSideChange: (
    event: SelectChangeEvent<string>,
    child: ReactNode
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
  grade: number;
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

export interface RankInfo {
  yourRankInfo: YourRankInfo;
}

export interface YourRankInfo {
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

export interface BackDropInfo {
  open: boolean;
  handleClose: () => void;
}

export interface UserInfo {
  name: string;
  furigana: string;
  student_id: string;
  grade: number;
  mailaddress: string;
  position: number;
  experience: number;
}

export interface UserInfoChange {
  userInfo: UserInfo;
  handle: () => void;
}

export interface ChangeUserInfo {
  name: string;
  furigana: string;
  student_id: string;
  mailaddress: string;
  grade: number;
  position: number;
  experience: number;
  nameEmpty: boolean;
  furiganaEmpty: boolean;
  student_idError: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFuriganaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStudent_idChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMailaddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGradeChange: (event: SelectChangeEvent<string>) => void;
  handlePositionChange: (event: SelectChangeEvent<string>) => void;
  handleExperienceChange: (event: SelectChangeEvent<string>) => void;
  handleChangeUserInfo: () => void;
}

export interface ChangeAdminPassword {
  password: string;
  confirmPassword: string;
  confirmPasswordEmpty: boolean;
  passwordLengthError: boolean;
  passwordError: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeAdminPassword: () => void;
}

export interface BackDropParticipantInfo {
  open: boolean;
  handleClose: () => void;
  club_match_id: number;
}

export interface ParticipantNameInfo {
  name: string;
  furigana: string;
}

export interface SendMailInfo {
  student_id: string;
  mailaddress: string;
  student_idError: boolean;
  mailaddressEmpty: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleStudent_idChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMailaddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMail: () => void;
}

export interface CategoryTopUser {
  all_top_user_name: string;
  all_top_user_id: number;
  gk_top_user_name: string;
  gk_top_user_id: number;
  df_top_user_name: string;
  df_top_user_id: number;
  of_top_user_name: string;
  of_top_user_id: number;
  goal_top_user_name: string;
  goal_top_user_id: number;
}

export interface ResisterAwardInfo {
  handleSelectAwardUser: (value: number) => () => void;
  resisterAwardUser: number[];
  awardName: string;
  awardNameEmpty: boolean;
  handleAwardNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleAwardResister: () => void;
}

export interface SelectInAllUsersInfo {
  handleSelectAwardUser: (value: number) => () => void;
  resisterAwardUser: number[];
}

export interface UsersNameInfo {
  name: string;
  user_id: number;
}

export interface AwardInfo {
  award_id: number;
  award_name: string;
  user_id: number;
  datetime: Date;
  user_name: string;
}

export interface DeleteAwardInfo {
  awardList: AwardInfo[];
  handleSelectDeleteAward: (value: number) => () => void;
  deleteAward: number[];
  handleDeleteAward: () => void;
  selectEmpty: boolean;
}

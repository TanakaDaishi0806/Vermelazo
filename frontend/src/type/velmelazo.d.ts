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
  setTeamMemberList: React.Dispatch<React.SetStateAction<TeamMember[][]>>;
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

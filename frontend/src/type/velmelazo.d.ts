export interface LoginInfo {
  studentID: string;
  password: string;
  studentIDEmpty: boolean;
  passwordEmpty: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleStudentIDChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
}

export interface NewAccountInfo {
  name: string;
  furigana: string;
  studentID: string;
  password: string;
  confirmPassword: string;
  mailaddress: string;
  grade: number;
  position: number;
  experience: number;
  nameEmpty: boolean;
  furiganaEmpty: boolean;
  studentIDEmpty: boolean;
  passwordEmpty: boolean;
  passwordError: boolean;
  inputError: boolean;
  allEmptyError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFuriganaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStudentIDChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

export interface ChatPanelHeaderPropsInterface {
  userState: UserStateType;
  imgUrl: string;
  joinState: JoinStateType;
}

export interface ChatPanelPresentationPropsInterface {
  user: string;
  imgUrl: string;
}

export type User = {
  name: string;
  imgUrl: string;
};

export type JoinStateType = {
  joinState: boolean;
  enableJoin: () => void;
  disableJoin: () => void;
};

export type UserStateType = {
  user: string;
  userId: string | null;
  putUserId: (userId: string | null) => void;
};

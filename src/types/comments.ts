export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type CommentToSend = {
  id: string;
  comment: string;
  rating: number;
};

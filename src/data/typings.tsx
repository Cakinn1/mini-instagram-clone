export interface MainProps {
  user: UserProps | null;
  results: ResultsProps[] | null;
}

export interface ResultsProps {
  id: number;
  user: UserProps;
  posts: SinglePostProps[];
}

export interface PostProps {
  id: number;
  user: UserProps;
  posts: SinglePostProps[];
}

export interface SinglePostProps {
  bookmarks: number;
  date: string;
  description: string;
  hashtags: string[];
  id: number;
  likes: number;
  location: string;
  photo: string;
}

export interface UserProps {
  username: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  location: string;
  name: string;
  id: number;
}

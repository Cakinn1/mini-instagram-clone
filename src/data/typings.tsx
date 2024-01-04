export default {};

export interface MainProps {
  user: UserProps | null;
  results: ResultsProps[] | null;
}

export interface ResultsProps {
  id: number;
  photo: string;
  description: string;
  likes: number;
  bookmarks: number;
  hashtags: string[];
  date: string;
  location: string;
  user: UserProps
}

export interface UserProps {
  username: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  location: string;
  name: string;
}

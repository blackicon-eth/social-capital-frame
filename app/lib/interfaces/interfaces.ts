export interface Users {
  fnames: string[];
  isFarcasterPowerUser: boolean;
  profileImage: string;
}

export interface User {
  fnames: string[];
  isFarcasterPowerUser: boolean;
  profileImage: string;
  socialCapital: {
    socialCapitalRank: number;
  };
}

export interface TrendingCastItem {
  cast: {
    castedBy: {
      fnames: string[];
      profileImage: string;
    };
    url: string;
  };
  channel: {
    name: string;
  };
}

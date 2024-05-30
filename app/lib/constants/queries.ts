export const getYourRankQuery = `query GetYourRank($id: String) {
  Socials(
    input: {filter: {dappName: {_eq: farcaster}, userId: {_eq: $id}}, blockchain: ethereum}
  ) {
    Social {
      fnames
      isFarcasterPowerUser
      profileImage
      socialCapital {
        socialCapitalRank
      }
    }
  }
}`;

export const getTopThreeCastersQuery = `query GetTopThreeCastersByFollowers {
    Socials(
      input: {filter: {dappName: {_eq: farcaster}}, blockchain: ethereum, order: {socialCapitalRank: ASC}, limit: 3}
    ) {
      Social {
        fnames
        isFarcasterPowerUser
        profileImage
      }
    }
}`;

export const getTopThreeCastersByFollowersQuery = `query GetTopThreeCastersByFollowers($amount: Int) {
    Socials(
        input: {filter: {dappName: {_eq: farcaster}, followerCount: {_lt: $amount}}, blockchain: ethereum, order: {socialCapitalRank: ASC}, limit: 3}
    ) {
        Social {
        fnames
        isFarcasterPowerUser
        profileImage
        }
    }
}`;

export const getTodaysTrendingCastsQuery = `query GetTodaysTrendingCasts {
    TrendingCasts(
        input: {timeFrame: one_day, blockchain: ALL, criteria: social_capital_value, limit: 3}
    ) {
        TrendingCast {
        cast {
            castedBy {
            fnames
            profileImage
            }
            url
        }
        channel {
            name
            }
        }
    }
}`;

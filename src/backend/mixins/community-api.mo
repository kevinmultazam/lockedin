import UserProfileLib "../lib/user-profile";
import ChallengeTrackerLib "../lib/challenge-tracker";
import Types "../types/user-profile";
import CommonTypes "../types/common";

mixin (profileState : UserProfileLib.ProfileState, challengeState : ChallengeTrackerLib.State) {

  /// Returns aggregated stats for all registered users (community leaderboard)
  public shared query ({ caller = _caller }) func getCommunityStats() : async [Types.CommunityUserStats] {
    UserProfileLib.getCommunityStats(profileState, challengeState)
  };

  /// Returns the full 30-day progress for the caller (same shape as getAllProgress)
  public shared query ({ caller }) func getMyAnalytics() : async CommonTypes.AllProgress {
    ChallengeTrackerLib.getAllProgress(challengeState, caller)
  };
};

import Map "mo:core/Map";
import Principal "mo:core/Principal";

import ChallengeTrackerLib "lib/challenge-tracker";
import UserProfileLib "lib/user-profile";
import UserProfileTypes "types/user-profile";

import ChallengeTrackerApi "mixins/challenge-tracker-api";
import UserProfileApi "mixins/user-profile-api";
import CommunityApi "mixins/community-api";


actor {
  let state : ChallengeTrackerLib.State = Map.empty<Principal, ChallengeTrackerLib.UserState>();
  let profileState : UserProfileLib.ProfileState = Map.empty<Principal, UserProfileTypes.UserProfile>();

  include ChallengeTrackerApi(state);
  include UserProfileApi(profileState);
  include CommunityApi(profileState, state);
};

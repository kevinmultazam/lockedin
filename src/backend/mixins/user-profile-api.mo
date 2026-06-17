import Int "mo:core/Int";
import Time "mo:core/Time";
import UserProfileLib "../lib/user-profile";
import Types "../types/user-profile";

mixin (profileState : UserProfileLib.ProfileState) {

  /// Returns the profile for the caller, or null if not yet set up
  public shared query ({ caller }) func getProfile() : async ?Types.UserProfile {
    UserProfileLib.getProfile(profileState, caller)
  };

  /// Sets the username for the caller (validated: 3–20 chars, alphanumeric + underscore)
  public shared ({ caller }) func setUsername(username : Text) : async { #ok; #err : Text } {
    UserProfileLib.setUsername(profileState, caller, username)
  };

  /// Returns 5 distinct daily random challenge strings from the expanded pool, seeded by today's UTC day
  public shared query ({ caller = _caller }) func getDailyRandomChallenge() : async [Text] {
    // Day index = nanoseconds since epoch / nanoseconds per day
    let dayIndex : Nat = Int.abs(Time.now()) / 86_400_000_000_000;
    UserProfileLib.getDailyRandomChallenge(dayIndex)
  };
};

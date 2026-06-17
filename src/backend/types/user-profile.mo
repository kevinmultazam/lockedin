module {
  /// Public user profile stored per principal
  public type UserProfile = {
    username : Text;
    joinedAt : Int;
  };

  /// Public stats for a single user shown on the community page
  public type CommunityUserStats = {
    username : Text;
    todayCompletion : Float;
    overallCompletion : Float;
    currentDay : Nat;
    currentStreak : Nat;
    totalPoints : Nat;
  };
};

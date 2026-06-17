import ChallengeTrackerLib "../lib/challenge-tracker";
import Types "../types/challenge-tracker";

mixin (state : ChallengeTrackerLib.State) {

  /// Returns the current day (1–30) for the caller
  public shared query ({ caller }) func getCurrentDay() : async Nat {
    ChallengeTrackerLib.getCurrentDay(state, caller);
  };

  /// Returns the challenge completion array for a given day (10 booleans), or null
  public shared query ({ caller }) func getDayProgress(day : Nat) : async ?[Bool] {
    ChallengeTrackerLib.getDayProgress(state, caller, day);
  };

  /// Returns all 30 days of progress for chart rendering
  public shared query ({ caller }) func getAllProgress() : async Types.AllProgress {
    ChallengeTrackerLib.getAllProgress(state, caller);
  };

  /// Sets completion state for a specific challenge on a given day
  public shared ({ caller }) func setChallenge(day : Nat, challengeIndex : Nat, completed : Bool) : async () {
    ChallengeTrackerLib.setChallenge(state, caller, day, challengeIndex, completed);
  };

  /// Advances to the next day (capped at 30)
  public shared ({ caller }) func nextDay() : async () {
    ChallengeTrackerLib.nextDay(state, caller);
  };

  /// Resets all progress and current day to 1
  public shared ({ caller }) func resetProgress() : async () {
    ChallengeTrackerLib.resetProgress(state, caller);
  };

  /// Returns the current streak (consecutive perfect days) for the caller
  public shared query ({ caller }) func getStreak() : async Nat {
    ChallengeTrackerLib.calculateStreak(state, caller);
  };

  /// Returns total points earned by the caller (completed challenges * 10, across all 30 days)
  public shared query ({ caller }) func getTotalPoints() : async Nat {
    ChallengeTrackerLib.calculateTotalPoints(state, caller);
  };
};

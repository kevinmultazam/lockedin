import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Types "../types/challenge-tracker";

module {
  /// Per-user mutable state: their day progress map and current day
  public type UserState = {
    progress : Map.Map<Nat, [Bool]>;
    var currentDay : Nat;
  };

  /// Top-level state: a map from Principal to per-user state
  public type State = Map.Map<Principal, UserState>;

  /// Retrieves or initializes the user state for the given caller (mutates state — for update calls only)
  func getOrInit(state : State, caller : Principal) : UserState {
    switch (state.get(caller)) {
      case (?us) us;
      case null {
        let us : UserState = { progress = Map.empty<Nat, [Bool]>(); var currentDay = 1 };
        state.add(caller, us);
        us;
      };
    };
  };

  /// Returns the current day (1–30) for the caller (read-only, returns 1 if not yet initialized)
  public func getCurrentDay(state : State, caller : Principal) : Nat {
    switch (state.get(caller)) {
      case (?us) us.currentDay;
      case null 1;
    };
  };

  /// Returns the challenge completion array for a given day, or null if no data yet
  public func getDayProgress(state : State, caller : Principal, day : Nat) : ?[Bool] {
    switch (state.get(caller)) {
      case (?us) us.progress.get(day);
      case null null;
    };
  };

  /// Returns all 30 days of progress data as an array of (day, completions) tuples
  public func getAllProgress(state : State, caller : Principal) : Types.AllProgress {
    switch (state.get(caller)) {
      case (?us) us.progress.toArray();
      case null [];
    };
  };

  /// Sets the completion state of a specific challenge (0–14) on a given day.
  /// Indices 0–9 are default challenges; indices 10–14 are daily random challenges.
  public func setChallenge(state : State, caller : Principal, day : Nat, challengeIndex : Nat, completed : Bool) {
    if (challengeIndex >= 15) {
      return;
    };
    let us = getOrInit(state, caller);
    let current : [Bool] = switch (us.progress.get(day)) {
      case (?existing) {
        // Grow existing array from 10 to 15 if needed (migration for old data)
        if (existing.size() < 15) {
          Array.tabulate(15, func i = if (i < existing.size()) existing[i] else false)
        } else existing
      };
      case null Array.repeat(false, 15);
    };
    let updated = Array.tabulate(15, func i = if (i == challengeIndex) completed else current[i]);
    us.progress.add(day, updated);
  };

  /// Advances to the next day (max 30) for the caller
  public func nextDay(state : State, caller : Principal) {
    let us = getOrInit(state, caller);
    if (us.currentDay < 30) {
      us.currentDay += 1;
    };
  };

  /// Resets all progress and sets current day back to 1 for the caller
  public func resetProgress(state : State, caller : Principal) {
    let us = getOrInit(state, caller);
    us.progress.clear();
    us.currentDay := 1;
  };

  /// Returns true if all 10 default challenges (indices 0–9) are completed.
  /// Random challenges (indices 10–14) are excluded from perfect-day/streak logic.
  func isPerfectDay(bools : [Bool]) : Bool {
    if (bools.size() < 10) return false;
    var i = 0;
    while (i < 10) {
      if (not bools[i]) return false;
      i += 1;
    };
    true
  };

  /// Calculates the total points earned by the caller: count of all completed challenges * 10
  public func calculateTotalPoints(state : State, caller : Principal) : Nat {
    switch (state.get(caller)) {
      case null 0;
      case (?us) {
        var total : Nat = 0;
        for ((_, bools) in us.progress.entries()) {
          for (b in bools.values()) {
            if (b) total += 1;
          };
        };
        total * 10
      };
    };
  };

  /// Calculates the current streak for the caller.
  /// Counts consecutive perfect days (all 10 challenges = true) ending at the most recent completed day.
  /// If currentDay itself is a perfect day it is counted; then we walk backwards through prior days.
  public func calculateStreak(state : State, caller : Principal) : Nat {
    switch (state.get(caller)) {
      case null 0;
      case (?us) {
        let day = us.currentDay;
        var streak : Nat = 0;

        // Determine the starting day: currentDay if it's perfect, otherwise currentDay - 1
        let startDay : Nat = switch (us.progress.get(day)) {
          case (?bools) if (isPerfectDay(bools)) day else { if (day > 1) day - 1 else 0 };
          case null { if (day > 1) day - 1 else 0 };
        };

        // Walk backwards from startDay counting consecutive perfect days
        var d = startDay;
        label streakLoop while (d >= 1) {
          switch (us.progress.get(d)) {
            case (?bools) {
              if (isPerfectDay(bools)) {
                streak += 1;
              } else {
                break streakLoop;
              };
            };
            case null { break streakLoop };
          };
          if (d == 0) break streakLoop;
          d -= 1;
        };
        streak
      };
    };
  };
};

module {
  /// Day number in the 30-day challenge (1–30)
  public type Day = Nat;

  /// Array of 10 booleans representing completion state of each challenge for a day
  public type DayProgress = [Bool];

  /// Summary of all 30 days for chart rendering
  public type AllProgress = [(Day, DayProgress)];
};

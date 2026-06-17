import Map "mo:core/Map";
import List "mo:core/List";
import Char "mo:core/Char";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/user-profile";
import ChallengeTrackerLib "../lib/challenge-tracker";

module {
  /// Per-principal profile store
  public type ProfileState = Map.Map<Principal, Types.UserProfile>;

  /// Pool of random daily challenges (Indonesian, distinct from default 10)
  let challengePool : [Text] = [
    "Mandi air dingin selama 30 detik",
    "Tidak minum kopi/teh hari ini",
    "Berjalan kaki minimal 30 menit",
    "Makan buah/sayur di setiap makan",
    "Tidak menonton TV/streaming hari ini",
    "Lakukan 50 push-up (boleh dicicil)",
    "Bicara dengan seseorang yang sudah lama tidak dihubungi",
    "Baca berita positif selama 15 menit",
    "Stretching pagi/sore selama 15 menit",
    "Tulis 3 hal yang kamu syukuri hari ini",
    "Tidak pakai handphone 2 jam sebelum tidur",
    "Coba resep masakan baru",
    "Dengarkan podcast edukatif 30 menit",
    "Lakukan hobby yang sudah lama ditinggalkan",
    "Rapikan dan bersihkan meja belajar/kerja",
    "Minum 3 liter air hari ini",
    "Bangun tanpa alarm dan langsung aktif",
    "Matikan semua notifikasi HP selama 4 jam",
    "Olahraga ringan 20 menit sebelum sarapan",
    "Buat rencana/to-do list untuk besok sebelum tidur",
    "Makan siang tanpa gadget",
    "Lakukan pernapasan dalam selama 5 menit",
    "Tidur minimal 7 jam malam ini",
    "Baca buku non-fiksi selama 20 menit",
  ];

  /// Returns true if the character is alphanumeric or underscore
  func isValidChar(c : Char) : Bool {
    (c >= 'a' and c <= 'z') or
    (c >= 'A' and c <= 'Z') or
    (c >= '0' and c <= '9') or
    c == '_'
  };

  /// Returns the profile for the given principal, or null if not registered
  public func getProfile(state : ProfileState, caller : Principal) : ?Types.UserProfile {
    state.get(caller)
  };

  /// Validates and saves a username for the caller.
  /// Returns #ok on success or #err with a validation message.
  public func setUsername(state : ProfileState, caller : Principal, username : Text) : { #ok; #err : Text } {
    let len = username.size();
    if (len < 3) {
      return #err("Username minimal 3 karakter");
    };
    if (len > 20) {
      return #err("Username maksimal 20 karakter");
    };
    let chars = username.toArray();
    let allValid = chars.all(func(c : Char) : Bool { isValidChar(c) });
    if (not allValid) {
      return #err("Username hanya boleh huruf, angka, dan underscore (_)");
    };
    switch (state.get(caller)) {
      case (?existing) {
        // Allow update — preserve original joinedAt
        state.add(caller, { username; joinedAt = existing.joinedAt });
        #ok
      };
      case null {
        state.add(caller, { username; joinedAt = Time.now() });
        #ok
      };
    }
  };

  /// Returns 5 distinct deterministic challenges from the pool seeded by the given day index.
  /// Uses a linear-congruential step to spread picks across the 24-item pool without repeats.
  public func getDailyRandomChallenge(dayIndex : Nat) : [Text] {
    let poolSize = challengePool.size(); // 24
    let count = 5;
    let picked = List.empty<Text>();
    var seed = dayIndex;
    var found : Nat = 0;
    var attempts : Nat = 0;
    while (found < count and attempts < poolSize) {
      let idx = seed % poolSize;
      let candidate = challengePool[idx];
      // Check for duplicate using index comparison (same pool, compare idx)
      var duplicate = false;
      var k : Nat = 0;
      while (k < found) {
        if (picked.at(k) == candidate) { duplicate := true };
        k += 1;
      };
      if (not duplicate) {
        picked.add(candidate);
        found += 1;
      };
      // LCG-style step: advance seed with a prime multiplier to hop across pool
      seed := (seed * 1_103_515_245 + 12_345) % poolSize;
      attempts += 1;
    };
    // Fallback: if LCG produced collisions, fill remaining slots sequentially
    var i : Nat = 0;
    while (found < count and i < poolSize) {
      let candidate = challengePool[i];
      var duplicate = false;
      var k : Nat = 0;
      while (k < found) {
        if (picked.at(k) == candidate) { duplicate := true };
        k += 1;
      };
      if (not duplicate) {
        picked.add(candidate);
        found += 1;
      };
      i += 1;
    };
    picked.toArray()
  };

  /// Computes community stats for all registered users.
  public func getCommunityStats(
    profileState : ProfileState,
    challengeState : ChallengeTrackerLib.State,
  ) : [Types.CommunityUserStats] {
    let results = List.empty<Types.CommunityUserStats>();
    for ((principal, profile) in profileState.entries()) {
      let currentDay = ChallengeTrackerLib.getCurrentDay(challengeState, principal);

      // todayCompletion: fraction of current day's challenges completed
      let todayProgress : Float = switch (ChallengeTrackerLib.getDayProgress(challengeState, principal, currentDay)) {
        case (?bools) {
          let sz = bools.size();
          if (sz == 0) 0.0
          else {
            let done : Nat = bools.foldLeft(0, func(acc : Nat, b : Bool) : Nat { if (b) acc + 1 else acc });
            done.toFloat() / sz.toFloat()
          }
        };
        case null 0.0;
      };

      // overallCompletion: average completion across all days with data
      let allProgress = ChallengeTrackerLib.getAllProgress(challengeState, principal);
      let overallComp : Float = if (allProgress.size() == 0) {
        0.0
      } else {
        var totalDone : Nat = 0;
        var totalPossible : Nat = 0;
        for ((_, bools) in allProgress.values()) {
          totalPossible += bools.size();
          for (b in bools.values()) {
            if (b) totalDone += 1;
          };
        };
        if (totalPossible == 0) 0.0
        else totalDone.toFloat() / totalPossible.toFloat()
      };

      results.add({
        username = profile.username;
        todayCompletion = todayProgress;
        overallCompletion = overallComp;
        currentDay;
        currentStreak = ChallengeTrackerLib.calculateStreak(challengeState, principal);
        totalPoints = ChallengeTrackerLib.calculateTotalPoints(challengeState, principal);
      });
    };
    // Sort descending by totalPoints; tiebreaker: currentStreak descending
    let sorted = results.sort(func(a : Types.CommunityUserStats, b : Types.CommunityUserStats) : Order.Order {
      if (a.totalPoints > b.totalPoints) #less
      else if (a.totalPoints < b.totalPoints) #greater
      else if (a.currentStreak > b.currentStreak) #less
      else if (a.currentStreak < b.currentStreak) #greater
      else #equal
    });
    sorted.toArray()
  };
};

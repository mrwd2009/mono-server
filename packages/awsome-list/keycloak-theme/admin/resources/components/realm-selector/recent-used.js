export class RecentUsed {
  constructor() {
    this.MAX_NUM = 4;
    this.KEY = "recent-used-realms";
    this.recentUsedRealms = JSON.parse(localStorage.getItem(this.KEY) || "[]");
  }
  save() {
    this.recentUsedRealms = this.recentUsedRealms.slice(0, this.MAX_NUM);
    localStorage.setItem(this.KEY, JSON.stringify(this.recentUsedRealms));
  }
  clean(existingRealms) {
    this.recentUsedRealms = this.recentUsedRealms.filter((realm) => existingRealms.includes(realm));
    this.save();
  }
  get used() {
    return this.recentUsedRealms;
  }
  setRecentUsed(realm) {
    if (!this.recentUsedRealms.includes(realm)) {
      this.recentUsedRealms.unshift(realm);
      this.save();
    }
  }
}

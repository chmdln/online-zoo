const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#368560',
  '#b84176', '#DDA0DD', '#20113D', '#f9b60c',
  '#676268', '#85C1E9', '#ff50e8', '#af9ce1',
];

export class UserObj {
  constructor() {
    this._data = this._load();
  }

  get username() { return this._data?.username ?? null; }
  get avatarName() { return this._data?.avatarName ?? null; }
  get avatarColor() { return this._data?.avatarColor ?? null; }
  get isDonor() { return this._data?.isDonor ?? false; }

  _load() {
    const stored = localStorage.getItem('user');
    if (!stored) return; 
    const user = JSON.parse(stored);

    const generated = {
      username: `@${user.username}`,
      avatarName: this._generateAvatarName(user),
      avatarColor: this._randomColor(),
      isDonor: user.isDonor || false,
    };
    return generated;
  }

 _generateAvatarName(user) {
    return user.name.slice(0, 2).toUpperCase();
  }

  _randomColor() {
    return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  }

  // call after donation
  markAsDonor() {
    this._data.isDonor = true;
    const user = localStorage.setItem('user', JSON.stringify({
      ...JSON.parse(localStorage.getItem('user')),
      isDonor: true,
    }));
  }

  toMessagePayload() {
    return {
      username: this.username,
      avatarName: this.avatarName,
      avatarColor: this.avatarColor,
      isDonor: this.isDonor,
    };
  }
}

export const User = new UserObj();
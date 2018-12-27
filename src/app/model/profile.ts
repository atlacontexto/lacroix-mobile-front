export class Profile {
  private _id: String;
  private createdAt: Date;
  private profileType: String;
  private kinship: any;
  private showType: String;
  private avatar: String;
  private main = false;
  private contacts: any;
  private bio: String;
  private active: boolean;
  private news: any;
  private follow: any;

  constructor() {}

  /**
   * Getter $follow
   * @return {any}
   */
  public get $follow(): any {
    return this.follow;
  }

  /**
   * Setter $follow
   * @param {any} value
   */
  public set $follow(value: any) {
    this.follow = value;
  }

  /**
   * Getter $news
   * @return {any}
   */
  public get $news(): any {
    return this.news;
  }

  /**
   * Setter $news
   * @param {any} value
   */
  public set $news(value: any) {
    this.news = value;
  }

  /**
   * Getter $createdAt
   * @return {Date}
   */
  public get $createdAt(): Date {
    return this.createdAt;
  }

  /**
   * Getter $profileType
   * @return {String}
   */
  public get $profileType(): String {
    return this.profileType;
  }

  /**
   * Getter $kinship
   * @return {any}
   */
  public get $kinship(): any {
    return this.kinship;
  }

  /**
   * Getter $contacts
   * @return {any}
   */
  public get $contacts(): any {
    return this.contacts;
  }

  /**
   * Getter $bio
   * @return {String}
   */
  public get $bio(): String {
    return this.bio;
  }

  /**
   * Getter $active
   * @return {boolean}
   */
  public get $active(): boolean {
    return this.active;
  }

  /**
   * Setter $createdAt
   * @param {Date} value
   */
  public set $createdAt(value: Date) {
    this.createdAt = value;
  }

  /**
   * Setter $profileType
   * @param {String} value
   */
  public set $profileType(value: String) {
    this.profileType = value;
  }

  /**
   * Setter $kinship
   * @param {any} value
   */
  public set $kinship(value: any) {
    this.kinship = value;
  }

  /**
   * Setter $contacts
   * @param {any} value
   */
  public set $contacts(value: any) {
    this.contacts = value;
  }

  /**
   * Setter $bio
   * @param {String} value
   */
  public set $bio(value: String) {
    this.bio = value;
  }

  /**
   * Setter $active
   * @param {boolean} value
   */
  public set $active(value: boolean) {
    this.active = value;
  }

  getProfileType(): String {
    return this.profileType;
  }

  getKinship(): String {
    return this.kinship;
  }

  /**
   * Getter id
   * @return {String}
   */
  public get id(): String {
    return this._id;
  }

  /**
   * Setter id
   * @param {String} value
   */
  public set id(value: String) {
    this._id = value;
  }

  update(number: number) {}

  /**
   * Getter $avatar
   * @return {String}
   */
  public get $avatar(): String {
    return this.avatar;
  }

  /**
   * Setter $avatar
   * @param {String} value
   */
  public set $avatar(value: String) {
    this.avatar = value;
  }

  /**
   * Getter $main
   * @return {boolean}
   */
  public get $main(): boolean {
    return this.main;
  }

  /**
   * Setter $main
   * @param {boolean} value
   */
  public set $main(value: boolean) {
    this.main = value;
  }

  /**
   * Getter $showType
   * @return {String}
   */
  public get $showType(): String {
    return this.showType;
  }

  /**
   * Setter $showType
   * @param {String} value
   */
  public set $showType(value: String) {
    this.showType = value;
  }
}

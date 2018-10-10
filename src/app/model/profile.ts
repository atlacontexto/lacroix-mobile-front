export class Profile {
  private _id: string;
  private createdAt: Date;
  private profileType: string;
  private kinship: any;
  private showType: string;
  private avatar: string;
  private main = false;
  private contacts: any;
  private bio: string;
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
   * @return {string}
   */
  public get $profileType(): string {
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
   * @return {string}
   */
  public get $bio(): string {
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
   * @param {string} value
   */
  public set $profileType(value: string) {
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
   * @param {string} value
   */
  public set $bio(value: string) {
    this.bio = value;
  }

  /**
   * Setter $active
   * @param {boolean} value
   */
  public set $active(value: boolean) {
    this.active = value;
  }

  getProfileType(): string {
    return this.profileType;
  }

  getKinship(): string {
    return this.kinship;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  update(number: number) {}

  /**
   * Getter $avatar
   * @return {string}
   */
  public get $avatar(): string {
    return this.avatar;
  }

  /**
   * Setter $avatar
   * @param {string} value
   */
  public set $avatar(value: string) {
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
   * @return {string}
   */
  public get $showType(): string {
    return this.showType;
  }

  /**
   * Setter $showType
   * @param {string} value
   */
  public set $showType(value: string) {
    this.showType = value;
  }
}

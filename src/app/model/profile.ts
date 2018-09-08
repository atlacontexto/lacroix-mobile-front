export class Profile {
  private _id: string;
  private createdAt: Date;
  private profileType: string;
  private kinship: any;
  private showType: string;
  private avatar: string;
  private main = false;

  constructor() {}

  getProfileType(): string {
    return this.profileType;
  }

  getKinship(): string {
    return this.kinship;
  }
  getId(): string {
    return this._id;
  }

  getShowType(): string {
    if (this.profileType === "ProfileProfessor") {
      this.showType = "Professor";
    } else if (this.profileType === "ProfileParent") {
      this.showType = "Família";
    } else if (this.profileType === "ProfileStudent") {
      this.showType = "Aluno";
    }
    return this.showType;
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

import { IUser } from '../interface';

export default class User {
  private props: IUser;

  constructor(props: IUser) {
    this.validate(props);
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }

  get role() {
    return this.props.role;
  }

  get authProvider() {
    return this.props.authProvider;
  }

  get isActive() {
    return this.props.isActive;
  }

  get location() {
    return {
      lat: this.props.curentLat,
      lng: this.props.currentLog,
    };
  }

  public activate() {
    this.props.isActive = true;
  }

  public deactivate() {
    this.props.isActive = false;
  }

  public updateLocation(lat: number, lng: number) {
    if (!this.isValidCoordinate(lat, lng)) {
      throw new Error('Invalid coordinates');
    }

    this.props.curentLat = lat;
    this.props.currentLog = lng;
  }

  public canHandleLoad(load: number): boolean {
    return load <= this.props.maxLoad;
  }

  public updateProfile(data: Partial<IUser>) {
    this.props = {
      ...this.props,
      ...data,
      updatedAt: new Date(),
    };
  }

  // ====== VALIDATION ======

  private validate(props: IUser) {
    if (!props.email) {
      throw new Error('Email is required');
    }

    if (!props.firstName || !props.lastName) {
      throw new Error('Name is required');
    }

    if (!this.isValidCoordinate(props.curentLat, props.currentLog)) {
      throw new Error('Invalid initial coordinates');
    }
  }

  private isValidCoordinate(lat: number, lng: number) {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }

  // ====== SERIALIZATION ======

  public toJSON(): IUser {
    return this.props;
  }
}

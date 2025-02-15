import { makeAutoObservable } from "mobx";
import { Devices, Types, User } from "../types/types";

export default class DeviceStore {
  private _types: Types[];
  private _brands: Types[];
  private _devices: Devices[];
  private _selectedType: {
    id: number;
  };
  private _selectedBrand: {
    id: number;
  };
  constructor() {
    this._types = [
      {
        id: 1,
        name: "Холодильники",
      },
      {
        id: 2,
        name: "Смартфоны",
      },
      {
        id: 3,
        name: "Ноутбуки",
      },
      {
        id: 4,
        name: "Телевизоры",
      },
    ];
    this._brands = [
      {
        id: 1,
        name: "Samsung",
      },
      {
        id: 2,
        name: "Apple",
      },
      {
        id: 3,
        name: "Lenovo",
      },
      {
        id: 4,
        name: "Asus",
      },
    ];
    this._devices = [
      {
        id: 1,
        name: "Iphone 12 pro",
        price: 50000,
        rating: 5,
        img: "/",
      },

      {
        id: 2,
        name: "Iphone 12 pro",
        price: 50000,
        rating: 5,
        img: "/",
      },
      {
        id: 3,
        name: "Iphone 12 pro",
        price: 50000,
        rating: 5,
        img: "/",
      },
      {
        id: 4,
        name: "Iphone 12 pro",
        price: 50000,
        rating: 5,
        img: "/",
      },
    ];
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setSelectedType(type) {
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
}

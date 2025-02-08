const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: { type: DataTypes.STRING },
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
  },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define("basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

/** Связь пользователя с корзиной 1 к 1. Так как у одного пользователя одна корзина
 * А корзина принадлежит сущности пользователя
 *
 */
User.hasOne(Basket);
Basket.belongsTo(User);

/** Один пользователь может иметь несколько оценок к товарам
 * Рейтинг принадлежит сущности пользователя
 */
User.hasMany(Rating);
Rating.belongsTo(User);

/** В одной козрине может быть несколько устройств
 * Устройства принадлежат корзине
 */
Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

/** Тип у устройства может быть несколько, смартфоны, холодильники и тд.
 * Устройства принадлежат типу
 */
Type.hasMany(Device);
Device.belongsTo(Type);

/** Бренд может включать в себя несколько устройств
 * У устройств есть бренд
 */
Brand.hasMany(Device);
Device.belongsTo(Brand);

/** У устройства может быть разный рейтинг
 * Рейтинг принадлежит устройству
 */
Device.hasMany(Rating);
Rating.belongsTo(Device);

/** Устройства могут лежать во многих корзинах
 * Корзина принадлежит устройству
 */
Device.hasMany(BasketDevice), BasketDevice.belongsTo(Device);

/** У устройств может быть много информации о нем
 * Информация об устройстве принадлежит устройству
 */
Device.hasMany(DeviceInfo);
DeviceInfo.belongsTo(Device);

/** Связующая таблица, остальные поля добавятся автоматически */
const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/** У типов может быть множество брендов, как и у брендов множество типов
 * При связи многим ко многим создается промежуточная таблица, чтобы понимать какой тип принадлежит
 * бренду и какой бренд типу
 *
 */

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  BasketDevice,
  Brand,
  Device,
  DeviceInfo,
  Rating,
  Type,
  TypeBrand,
};

const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const { ApiError } = require("../error/ApiError");
class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.array.forEach((element) => {
          DeviceInfo.create({
            title: element.title,
            description: element.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query;

      page = page || 1;
      limit = limit || 9;

      /** Посчитать отступ учитывая страницу и лимит, например сраница 2, лимит 9, 18 - 9 = отсуп в 9 товаров */
      let offset = page * limit - limit;

      let devices;
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          limit,
          offset,
        });
      }
      return res.json(devices);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  // возвращаем сразу с характеристиками
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return next(ApiError.badRequest("id не задан"));
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}
module.exports = new DeviceController();

const { ApiError } = require("../error/ApiError");
const { Brand } = require("../models/models");

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        return ApiError.badRequest("Имя бренда не задано");
      }
      const existingName = await Brand.findOne({ where: { name } });
      if (existingName) return ApiError.badRequest("Имя бренда уже существует");
      const brand = await Brand.create({ name });
      res.json(brand);
    } catch (error) {
      return next(ApiError.internal("Ошибка при создании бренда"));
    }
  }
  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении брендов"));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) return next(ApiError.badRequest("id не задан"));
      const deleteCount = await Brand.destroy({ where: { id } });
      if (deleteCount === 0)
        return next(ApiError.badRequest("бренд с таким id не найден"));
      return res.json({ message: "Бренд удален" });
    } catch (error) {}
  }
}
module.exports = new BrandController();

const { Type } = require("../models/models");
const { ApiError } = require("../error/ApiError");
class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        return next(ApiError.badRequest("Имя не задано"));
      }
      const existingType = await Type.findOne({ where: { name } });

      if (existingType) {
        return next(ApiError.badRequest("Тип с таким именем уже существует"));
      }
      const type = await Type.create({ name });
      return res.json(type);
    } catch (error) {
      return next(ApiError.internal("Ошибка при создании типа"));
    }
  }
  async getAll(req, res, next) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении типов"));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("Id не задан"));
      }
      const deleteCount = await Type.destroy({ where: { id } });
      if (deleteCount === 0) {
        return next(ApiError.badRequest("Тип с таким id не найден"));
      }
      res.json({ message: "Тип успешно удален" });
    } catch (error) {
      return next(ApiError.internal("Ошибка при удалении типа"));
    }
  }
}
module.exports = new TypeController();

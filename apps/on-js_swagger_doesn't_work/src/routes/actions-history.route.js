const express = require("express");
const router = express.Router();

import { create, findByUserId } from "../queries/actions-history.query";

/**
 * @swagger
 * components:
 *   schemas:
 *     Actions-History:
 *       type: object
 *       required:
 *         - user_id
 *         - action_type
 *         - created_at
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id
 *         user_id:
 *           type: number
 *           description: Id пользоваетля
 *         action_type:
 *           type: string
 *           description: Тип действия (создание или обновление)
 *         created_at:
 *           type: string
 *           format: date
 *           description: Дата добавления записи
 *       example:
 *         user_id: 354
 *         action_type: "CREATE"
 *         created_at: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Actions-History
 *   description: API
 * /actions-history:
 *   post:
 *     summary: Создание записи
 *     tags: [Actions-History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Actions-History'
 *     responses:
 *       200:
 *         description: Созданная запись.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actions-History'
 *       500:
 *         description: Some server error
 * /actions-history/{user_id}:
 *   get:
 *     summary: Получить все записи по id пользователя
 *     tags: [Actions-History]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: number
 *         required: true
 *         description: id пользователя
 *     responses:
 *       200:
 *         description: Все записи по id пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actions-History'
 *       404:
 *         description: Записи не найдены
 */

router.get("/:userid", function (req, res) {
  alert("AAA");
  console.log(req);
  const result = findByUserId();
  console.log(result);
  result ? res.status(200).json(result) : res.sendStatus(404);
});

router.post("/", function (req, res) {
  const { userId, actionType, createdAt } = req.body;

  create(userId, actionType, createdAt);

  res.status(201).json(book);
});

module.exports = router;

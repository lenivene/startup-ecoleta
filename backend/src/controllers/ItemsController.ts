import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => {
      const { id, title } = item;

      return {
        id,
        title,
        image_url: `${req.protocol}://${req.get("host")}/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default new ItemsController();

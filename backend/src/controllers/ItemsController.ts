import { Request, Response } from "express";
import knex from "../database/connection";

// Utils
import getReqUrlUpload from "../utils/getReqUrlUpload";

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => {
      const { id, title } = item;

      return {
        id,
        title,
        image_url: getReqUrlUpload(item.image, req),
      };
    });

    return res.json(serializedItems);
  }
}

export default new ItemsController();

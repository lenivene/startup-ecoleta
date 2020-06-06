import { Request } from "express";

const getReqUrlUpload = (file: string, req: Request) => {
  return `${req.protocol}://${req.get("host")}/uploads/${file}`;
};

export default getReqUrlUpload;

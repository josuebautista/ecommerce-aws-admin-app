import { mongooseConnect } from "@/lib/mongoose";
import { MongoAPIError } from "mongodb";
import { getServerSession } from "next-auth";
import { authConfig, isAdminRequest } from "./auth/[...nextauth]";

const { Category } = require("@/models/Category");

const handle = async (req, res) => {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'POST') {
    const { name, parent, properties } = req.body;
    const categoryDoc = await Category.create(
      {
        name,
        parent: parent || undefined,
        properties,
      }
    );
    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { name, parent, _id, properties } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id }, { name, parent: parent || undefined, properties }
    );
    res.json(categoryDoc);
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Category.deleteOne({ _id: req.query?.id });
      res.json(true)
    }
  }
}

export default handle
import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import Url from "../models/url.model";
import {
  BAD_REQUEST,
  NOT_FOUND,
  OK,
} from "../constants/http";
const { ObjectId } = require("mongodb");
const shortid = require("shortid");

export const createUrlHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { originalUrl } = req.body;

    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      res.status(BAD_REQUEST).json({
        error: {
          status: BAD_REQUEST,
          title: "Conflict",
          detail: "This URL already exists.",
        },
      });
      return;
    }

    if (!originalUrl) {
      res.status(BAD_REQUEST).json({
        error: {
          status: BAD_REQUEST,
          title: "Invalid Attribute",
          detail: "The original URL is required.",
        },
      });
      return;
    }

    const slug = shortid.generate();
    const newUrl = new Url({ originalUrl, slug });
    await newUrl.save();

    res.status(OK).json({
      data: {
        type: "urls",
        id: newUrl._id,
        attributes: {
          slug: newUrl.slug,
        },
      },
    });
  }
);

export const redirectUrlHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const url = await Url.findOne({ slug });
    if (!url) {
      res.status(NOT_FOUND).json({
        error: {
          status: NOT_FOUND,
          title: "Not Found",
          detail: "The original URL was not found.",
        },
      });
      return;
    }

    url.visits = url.visits + 1;
    await url.save();

    res.status(OK).json({
      data: {
        type: "urls",
        id: url._id,
        attributes: {
          originalUrl: url.originalUrl,
        },
      },
    });
  }
);

export const getUrlListHandler = catchErrors(
  async (req: Request, res: Response) => {
    const urlList = await Url.find();
    res.status(OK).json({
      data: urlList.map((url) => ({
        type: "urls",
        id: url._id,
        attributes: {
          originalUrl: url.originalUrl,
          slug: url.slug,
          visits: url.visits
        },
      })),
    });
  }
);

export const updateUrlHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { originalUrl, slug } = req.body;

    if (!slug) {
      res.status(BAD_REQUEST).json({
        error: {
          status: `${BAD_REQUEST}`,
          title: "Invalid Attributes",
          detail: "Slug is required.",
        },
      });
      return;
    }

    const isSlugExisting = await Url.findOne({ slug });
    if (isSlugExisting) {
      res.status(BAD_REQUEST).json({
        error: {
          status: `${BAD_REQUEST}`,
          title: "Not Found",
          detail: "That slug is already taken. Choose another one.",
        },
      });
      return;
    }

    const url = await Url.findOne({ originalUrl });
    if (!url) {
      res.status(NOT_FOUND).json({
        error: {
          status: `${NOT_FOUND}`,
          title: "Not Found",
          detail: "The original URL was not found.",
        },
      });
      return;
    }

    url.originalUrl = originalUrl;
    url.slug = slug;
    await url.save();

    res.status(OK).json({
      data: {
        type: "urls",
        id: url._id,
        message: "Slug updated successfully.",
      },
    });
  }
);

export const deleteUrlsHandler = catchErrors(
  async (req: Request, res: Response) => {
    const ids = req.body;

    if (!Array.isArray(ids)) {
      return res
        .status(BAD_REQUEST)
        .json({
          error: {
            status: `${BAD_REQUEST}`,
            title: "Not Found",
            detail: "Invalid request format. Must be an array.",
          },
        });
    }

    const objectIds = ids.map((id) => new ObjectId(id));
    const result = await Url.deleteMany({
      _id: { $in: objectIds },
    });

    res.status(OK).json({
      meta: {
        deletedCount: result.deletedCount,
      },
    });
  }
);

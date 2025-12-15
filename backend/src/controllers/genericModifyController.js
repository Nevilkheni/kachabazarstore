import { getModelForFile } from "../models/GenericItem.js";

export const getItem = async (req, res) => {
    try {
        const { file, id } = req.params;
        if (!file) {
            return res.status(400).json({ msg: "file param missing" });
        }
        const Model = getModelForFile(file.toLowerCase());

        const item = await Model.findById(id);

        if (!item) {
            return res.status(404).json({ msg: "item not found", id });
        }

        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "server error", error: err.message });
    }
};

export const removeItem = async (req, res) => {
    try {
        const { file, id } = req.params;
        if (!file) {
            return res.status(400).json({ msg: "file param missing" });
        }
        const Model = getModelForFile(file.toLowerCase());

        const deleted = await Model.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ msg: "id missing", id });
        }

        res.json({ msg: "deleted fam", removedId: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "server error", error: err.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { file, id } = req.params;
        if (!file) {
            return res.status(400).json({ msg: "file param missing" });
        }
        const Model = getModelForFile(file.toLowerCase());

        const updated = await Model.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ msg: "id missing", id });
        }

        res.json({ msg: "updated lesgo", item: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "server error", error: err.message });
    }
};

export const replaceItem = async (req, res) => {
    try {
        const { file, id } = req.params;
        if (!file) {
            return res.status(400).json({ msg: "file param missing" });
        }
        const Model = getModelForFile(file.toLowerCase());

        const { _id, id: bodyId, ...rest } = req.body;
        const replaced = await Model.findByIdAndUpdate(
            id,
            { ...rest },
            { new: true, upsert: false }
        );

        if (!replaced) {
            return res.status(404).json({ msg: "id missing", id });
        }

        res.json({ msg: "replaced item ong", item: replaced });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "server error", error: err.message });
    }
};

export const addItem = async (req, res) => {
    try {
        const { file } = req.params;
        if (!file) {
            return res.status(400).json({ msg: "file param missing" });
        }
        const Model = getModelForFile(file.toLowerCase());

        delete req.body._id;
        const item = await Model.create(req.body);

        res.status(201).json({ msg: "item added", item });
    } catch (err) {
        res.status(500).json({ msg: "frick", error: err.message });
    }
};

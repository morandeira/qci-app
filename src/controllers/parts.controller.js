import pool from "../database.js";
import { config } from "dotenv";
import { dt } from "../lib/utils.js";

config();

export const renderAddPart = (req, res) => {
  try {
      res.render("parts/add");
  } catch (error) {
      console.log("To do catching error");
  };
};

export const addPart = async (req, res) => {
  try {
    const { np, designation } = req.body;
    const newPart = {
      np,
      designation,
      user_id: req.user.id
    };
    await pool.query(process.env.INSERT_PART, [newPart]);
    req.flash("success", "Part Saved Successfully");
    res.redirect("/parts");
  } catch (error) {
    console.log(error);       // Capturar el error sqlState, sqlMessage
    req.flash("message", "Error Nº " + error.errno + " -> " + error.sqlMessage);
    res.redirect("#");
  };
};

export const renderParts = async (req, res) => {
  try {
      const [rows] = await pool.query(process.env.RENDER_PARTS, [req.user.id]);
      res.render("parts/list", { parts: rows });
  } catch (error) {
      console.log("To do catching error");
  };
};

export const deletePart = async (req, res) => {
    console.log("Function not define");
};

export const renderEditPart = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(process.env.RENDER_PART, [id]);
    res.render("parts/edit", { part: rows[0] });
  } catch (error) {
    console.log("To do catching error");
  };
};

export const editPart = async (req, res) => {
  try {
    const { id } = req.params;
    const { np, designation } = req.body;
    const newPart = {
      np,
      designation,
      modified_at: dt()
    };
    await pool.query(process.env.UPDATE_PART, [newPart, id]);
    req.flash("success", "Part Updated Successfully");
    res.redirect("/parts");
  } catch (error) {
    console.log(error);       // Capturar el error sqlState, sqlMessage
    req.flash("message", "Error Nº " + error.errno + " -> " + error.sqlMessage);
    res.redirect("#");
  };
};
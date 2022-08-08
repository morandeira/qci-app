import pool from "../database.js";
import { config } from "dotenv";
import { dt } from "../lib/utils.js";

config();

export const renderAddDefault = (req, res) => {
  try {
      res.render("defaults/add");
  } catch (error) {
      console.log("To do catching error");
  };
};

export const addDefault = async (req, res) => {
  try {
    const { designation, type } = req.body;
    const newDefault = {
      designation,
      type,
      user_id: req.user.id
    };
    await pool.query(process.env.INSERT_DEFAULT, [newDefault]);
    req.flash("success", "Default Saved Successfully");
    res.redirect("/defaults");
  } catch (error) {
    console.log(error);       // Capturar el error sqlState, sqlMessage
    req.flash("message", "Error Nº " + error.errno + " -> " + error.sqlMessage);
    res.redirect("#");
  };
};

export const renderDefaults = async (req, res) => {
  try {
      const [rows] = await pool.query(process.env.RENDER_DEFAULTS, [req.user.id]);
      res.render("defaults/list", { defaults: rows });
  } catch (error) {
      console.log("To do catching error");
  };
};

export const deleteDefault = async (req, res) => {
    console.log("Function not define");
};

export const renderEditDefault = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(process.env.RENDER_DEFAULT, [id]);
    res.render("defaults/edit", { default: rows[0] });
  } catch (error) {
    console.log("To do catching error");
  };
};

export const editDefault = async (req, res) => {
  try {
    const { id } = req.params;
    const { designation, type } = req.body;
    const newDefault = {
      designation,
      type,
      modified_at: dt()
    };
    await pool.query(process.env.UPDATE_DEFAULT, [newDefault, id]);
    req.flash("success", "Default Updated Successfully");
    res.redirect("/defaults");
  } catch (error) {
    console.log(error);       // Capturar el error sqlState, sqlMessage
    req.flash("message", "Error Nº " + error.errno + " -> " + error.sqlMessage);
    res.redirect("#");
  };
};
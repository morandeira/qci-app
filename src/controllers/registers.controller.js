import pool from "../database.js";
import { config } from "dotenv";
import { dt } from "../lib/utils.js";

config();

export const renderAddRegister = async (req, res) => {
  try {
    const [rows_parts] = await pool.query(process.env.SELECT_PARTS);
    const [rows_eticolors] = await pool.query(process.env.SELECT_ETICOLORS);
    const [rows_defaults] = await pool.query(process.env.SELECT_DEFAULTS);
    res.render("registers/add", { parts: rows_parts, eticolors: rows_eticolors, defaults: rows_defaults });
  } catch (error) {
    console.log("To do catching error");
  };  
};

export const addRegister = async (req, res) => {
  try {
    const { color_id, part_id, label, default_id, observation } = req.body;
    const newRegister = {
      color_id,
      part_id,
      label,
      default_id,
      observation,
      user_id: req.user.id
    };
    await pool.query(process.env.INSERT_REGISTER, [newRegister]);
    req.flash("success", "Register Saved Successfully");
    res.redirect("/registers");
  } catch (error) {
    console.log(error);       // Capturar el error sqlState, sqlMessage
    req.flash("message", "Error Nº " + error.errno + " -> " + error.sqlMessage);
    res.redirect("#");
  };
};

export const renderRegisters = async (req, res) => {
  try {
    const [rows] = await pool.query(process.env.RENDER_REGISTERS, [req.user.id]);
    res.render("registers/list", { records: rows });
  } catch (error) {
    console.log(error);
  };
};

export const deleteRegister = async (req, res) => {  
  try {
    const { id } = req.params;
    await pool.query(process.env.DELETE_REGISTER, [id]);
    req.flash("success", "Register Removed Successfully");
    res.redirect("/registers");
  } catch (error) {
    console.log("To do catching error");
  };  
};

export const renderEditRegister = async (req, res) => {  
  try {
    const { id } = req.params;
    const [rows_parts] = await pool.query(process.env.SELECT_PARTS);
    const [rows_eticolors] = await pool.query(process.env.SELECT_ETICOLORS);
    const [rows_defaults] = await pool.query(process.env.SELECT_DEFAULTS);
    const [rows] = await pool.query(process.env.RENDER_REGISTER, [id]);
    res.render("registers/edit", { register: rows[0], parts: rows_parts, eticolors: rows_eticolors, defaults: rows_defaults });
  } catch (error) {
    console.log("To do catching error");
  };
};

export const editRegister = async (req, res) => {  
  try {
    const { id } = req.params;
    const { color_id, part_id, label, default_id, observation } = req.body;    
    const newRegister = {
      color_id,
      part_id,
      label,
      default_id,
      observation,
      modified_at: dt()
    };
    await pool.query(process.env.UPDATE_REGISTER, [newRegister, id]);
    req.flash("success", "Register Updated Successfully");
    res.redirect("/registers");
  } catch (error) {
    console.log(error);       // Capturar el error sqlState, sqlMessage
    req.flash("message", "Error Nº " + error.errno + " -> " + error.sqlMessage);
    res.redirect("#");
  };
};

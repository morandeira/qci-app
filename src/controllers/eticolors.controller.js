import pool from "../database.js";
import { config } from "dotenv";
import { dt } from "../lib/utils.js";

config();

export const renderAddEticolor = (req, res) => {
  try {
    res.render("eticolors/add");  
  } catch (error) {
    console.log("To do catching error");
  };  
};

export const addEticolor = async (req, res) => {
  try {
    const { rgbcode, designation } = req.body;
    const newEticolor = {      
      rgbcode,
      designation,
      user_id: req.user.id
    };
    await pool.query(process.env.INSERT_ETICOLOR, [newEticolor]);
    req.flash("success", "Eti Color Saved Successfully");
    res.redirect("/eticolors");
  } catch (error) {
    console.log(error);       // Capturar el error sqlState, sqlMessage
    req.flash("message", "Error Nº " + error.errno + " -> " + error.sqlMessage);
    res.redirect("#");
  };
};

export const renderEticolors = async (req, res) => {
  try {
      const [rows] = await pool.query(process.env.RENDER_ETICOLORS, [req.user.id]);
      res.render("eticolors/list", { eticolors: rows });
  } catch (error) {
      console.log("To do catching error");
  };
};

export const deleteEticolor = async (req, res) => {
  console.log("Function not define");
};

export const renderEditEticolor = async (req, res) => {
  try {
      const { id } = req.params;
      const [rows] = await pool.query(process.env.RENDER_ETICOLOR, [id]);
      res.render("eticolors/edit", { eticolor: rows[0] });
  } catch (error) {
      console.log("To do catching error");
  };
};

export const editEticolor = async (req, res) => {
  try {
    const { id } = req.params;
    const { rgbcode , designation } = req.body;
    const newEticolor = {
      rgbcode,
      designation,
      modified_at: dt()
    };
    await pool.query(process.env.UPDATE_ETICOLOR, [newEticolor, id]);
    req.flash("success", "Eti Color Updated Successfully");
    res.redirect("/eticolors");
  } catch (error) {
    console.log(error);       // Capturar el error sqlState, sqlMessage
    req.flash("message", "Error Nº " + error.errno + " -> " + error.sqlMessage);
    res.redirect("#");
  };
};
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const isLoggedIn = require("../middleware/isLoggedin");
const catchAsync = require("../AsyncErrors");
const nodemailer = require("nodemailer");

const User = require("../models/users");
const customerSchema = require("../models/customerRegister");

const mail = async (name, reason, contact, text) => {
  const gerente = await User.findOne({ puesto: "Gerente de Operaciones" });
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  mailOptions = {
    to: gerente.email,
    from: process.env.USER,
    subject: reason,
    text:
      "Ha recibido este correo ya que se ha utilizado la forma en el sitio web.\n\n" +
      "Proviene de: " +
      name +
      "\n\n" +
      "Con su forma de contacto indicada: " +
      contact +
      "\n\n" +
      "Siendo su correo:\n\n" +
      text +
      "\n\n",
  };
  smtpTransport.sendMail(mailOptions, function (err) {
    console.log("mail sent");
  });
};

router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const customers = await customerSchema.find({}).exec();
    res.render("customers/home", { customers });
  })
);

router.post(
  "/new",
  isLoggedIn,
  catchAsync(async (req, res) => {
    try {
      const { email, username, password, firstName, lastName, company } =
        req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newCustomer = await customerSchema.create({
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        company,
      });
      req.flash("success", "Se guarda correctamente el perfil del cliente.");
      res.redirect(`/clientes/show/${newCustomer._id}`);
    } catch (e) {
      console.log(e);
      req.flash("error", "Se produjo un error.");
      res.redirect("/clientes");
    }
  })
);
router.post(
  "/sendmail",
  catchAsync(async (req, res) => {
    const { name, reason, contact, text } = req.body;
    mail(name, reason, contact, text);
  })
);
router.get(
  "/show/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    try {
      const customer = await customerSchema.findById(req.params.id);
      res.render("customers/show", { customer });
    } catch (e) {
      console.log(e);
      req.flash("error", "Se produjo un error.");
      res.redirect("/clientes");
    }
  })
);

router.get(
  "/show/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    try {
      const customer = await customerSchema.findById(req.params.id);
      res.render("customers/edit", { customer });
    } catch (e) {
      console.log(e);
      req.flash("error", "Se produjo un error.");
      res.redirect("/clientes");
    }
  })
);

router.put(
  "/show/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const customer = await customerSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    await customer.save();
    res.redirect(`/clientes/${customer._id}`);
  })
);

router.delete(
  "/show/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await customerSchema.findByIdAndDelete(id);
    req.flash("success", "Usuario eliminado.");
    res.redirect("/clientes");
  })
);
module.exports = router;

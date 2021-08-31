const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {
    const { name, email, password } = req.body;

    try {
        // verificar email
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe con otro usuario.'
            });
        }

        // crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        // encriptar password(hash)
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        // generar JWT
        const token = await generarJWT(dbUser.id, name, email);

        // crear usuario en DB
        await dbUser.save();

        // generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Comuníquese con el administrador.'
        });
    }
};

const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const dbUser = await Usuario.findOne({ email });
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                // msg: 'Email o password inválido.'
                msg: 'Email no existe.' // este mensaje es solo con fines educativos
            });
        }

        // validar password
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                // msg: 'Email o password inválido.'
                msg: 'Password inválido.' // este mensaje es solo con fines educativos
            });
        }

        // generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name, dbUser.email);

        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuníquese con el administrador.'
        });
    }
};

const revalidarToken = async(req, res = response) => {
    // leer los datos que devolvió el middleware validarJWT que se colocó en la ruta
    const { uid } = req;

    const dbUser = await Usuario.findById(uid);

    // generar un nuevo JWT
    const token = await generarJWT(uid, dbUser.name);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};
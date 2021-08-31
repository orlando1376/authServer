const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// crea un nuevo usuario (localhost:4000/api/auth/new)
// ruta, middleware(validaciones), controlador
router.post('/new', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La longitud del password no cumple con los requerimientos.').isLength({ min: 6 }),
    validarCampos // middleware personalizado
], crearUsuario);

// login de usuario (localhost:4000/api/auth/)
// ruta, middleware(validaciones), controlador
router.post('/', [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La longitud del password no cumple con los requerimientos.').isLength({ min: 6 }),
    validarCampos // middleware personalizado
], loginUsuario);

// validar token (localhost:4000/api/auth/renew)
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
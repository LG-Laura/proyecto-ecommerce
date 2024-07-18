import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
    const { name, lastName, password, email, roleId, telefono } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword)

    //verificamos si ya existe un usuario creado
    const user = await User.findOne({ where: {email: email } });

    if (user) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con este mail' 
        }) 
    }

    try {
        //guardamos usuario en la base de datos
         await User.create({
            name,
            lastName,
            password: hashedPassword,
            email,
            roleId,
            telefono
        });
        
         // Envía una respuesta al cliente indicando que el usuario fue creado exitosamente
        res.status(201).json({
            msg: 'Nuevo usuario creado'
            
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Error al intentar crear un usuario',
            error
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        //validamos si el usuario ya existe en la base de datos
        const user: any = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                msg: 'El usuario ingresado no existe',
            })
        }
        
        //validamos password
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Password incorrecta'
            })
        }

        //generamos token
        const token = jwt.sign({
            email: email
        }, process.env.SECRET_KEY || 'probando123')
        //tambien se puede agregar el tiempo de expiracion del token
    //}, process.env.SECRET_KEY || 'probando123', {
    //expiresIn: '10000'
    //});

        res.json(token);

    } catch (error) {
        res.status(500).json({
            msg: 'Error al intentar logearse',
            error
        });
    }
}

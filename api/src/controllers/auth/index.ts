import argon from 'argon2';
import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from 'http-errors';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import type { User } from '../../entities/user';
import type { AuthLoginBody, AuthLoginResponse } from '../../types/routes/auth';
import { validateLoginBody } from './validators';

const login = (
    req: TypedRequestBody<AuthLoginBody>,
    res: Response<AuthLoginResponse>,
    next: NextFunction,
) => {
    validateLoginBody(req.body);

    passport.authenticate(
        "local",
        (err: HttpError | null, user: User | undefined) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(
                    createHttpError(401, 'Incorrect credentials'),
                );
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res.send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                });
            });
        },
    )(req, res, next);
};

const logout = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => res.send());
    });
};

const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
try {
    const { input } = req.body;
    const { email, password } = input.body;
  // Validasi data registrasi
    const hashedPassword = await argon.hash(password);
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
        console.log(hashedPassword);
    const variables = {
        email,
        password: password,
        name: email
      };
      
    const mutation = `
        mutation Register($email: String!, $password: String!, $name: String!) {
            insert_users_one(object: {email: $email, name: $name, password: $password}){
            id
            name
            email
            password
            created_at
            updated_at
        }
        }`;

    console.log(variables)
      const response = await fetch(process.env.HASURA_GRAPHQL_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });
      
      const data = await response.json();
      console.log(data);
    
      if (data.errors) {
        throw data.errors;
      }
    
      const user = data.data.insert_users_one;
    
    return res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: accessToken,
      });
    
    
} catch (error) {
    console.log(error);
    res.send({ error: error });
}
};

const authenticated = (
    req: Request,
    res: Response,
) => {
    if (req.isAuthenticated()) {
        res.send('You are authenticated');
    } else {
        res.send('You are not authenticated');
    }
};

export default {
    login,
    logout,
    authenticated,
    register
};
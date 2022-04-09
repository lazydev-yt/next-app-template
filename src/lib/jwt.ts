import expressJwt from 'express-jwt'
import { NextApiRequest } from 'next'

export const jwt = expressJwt({
  secret: process.env.SESSION_SECRET,
  algorithms: ['HS256'],
})

export type AuthNextApiRequest = NextApiRequest & { user: { sub: string } }

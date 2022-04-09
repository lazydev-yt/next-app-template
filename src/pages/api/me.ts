import { AuthNextApiRequest, jwt } from 'lib/jwt'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<AuthNextApiRequest, NextApiResponse>()
  .use(jwt)
  .get(async (req, res) => {
    res.json({ user: req.user })
  })
  .options(async (req, res) => {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  })

export default handler

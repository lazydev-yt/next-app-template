import { generateNonce } from 'siwe'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .get(async (_req, res) => {
    const nonce = generateNonce()
    res.setHeader('Content-Type', 'text/plain')
    res.send(nonce)
  })
  .options(async (req, res) => {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  })

export default handler

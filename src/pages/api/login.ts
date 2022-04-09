import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { SiweMessage } from 'siwe'
import jwt from 'jsonwebtoken'

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    try {
      const { message, signature, nonce } = req.body
      const siweMessage = new SiweMessage(message)
      const fields = await siweMessage.validate(signature)

      if (fields.nonce !== nonce) {
        return res.status(422).json({ message: 'Invalid nonce.' })
      }

      const token = jwt.sign(
        { sub: fields.address },
        process.env.SESSION_SECRET,
        { expiresIn: '7d' },
      )

      res.json({ token })
    } catch (error) {
      console.error(error)
      res.status(500).end()
    }
  })
  .options(async (req, res) => {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  })

export default handler

import { SiweMessage } from 'siwe'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

export interface AuthState {
  error: string | null
  user: { sub: string } | null
  token: string | null
  isAuthenticated: boolean
  isAuthenticating: boolean
  login: (message: SiweMessage, signature: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>(
  persist(
    set => ({
      isAuthenticating: false,
      isAuthenticated: false,
      error: null,
      user: null,
      token: null,

      login: async (message: SiweMessage, signature: string) => {
        try {
          set({ isAuthenticating: true })
          const response = await axios.post<{ token: string; address: string }>(
            '/api/login',
            {
              nonce: message.nonce,
              message,
              signature,
            },
          )
          const me = await axios.get<{ user: { sub: string } }>('/api/me', {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          })

          set({
            token: response.data.token,
            user: me.data.user,
            isAuthenticating: false,
            isAuthenticated: true,
          })
        } catch (error) {
          set({ error: error.message, isAuthenticating: false })
        }
      },

      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-app',
      getStorage: () => localStorage,
    },
  ),
)

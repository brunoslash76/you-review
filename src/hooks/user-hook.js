import create from 'zustand'

export const useUser = create(set => ({
    user: 'banana',
    setUser: (user) => {
        console.log(user)
        set(() => ({ user }))
    },
    removeUser: () => set(() => ({user: null}))
}))
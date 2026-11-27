const authUsers = [
    { username: 'JakeA', password: 'api2026'},
    { username: 'jk', password: 'sala'},
    { username: 'pl', password: 'pass'}
]

export const getAuthUser = (username) => {
    return authUsers.find(u => u.username === username)
}
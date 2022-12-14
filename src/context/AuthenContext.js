import React from "react"

const DEFAULT_VALUE = {
    isLogin: null,
    token: '',
    tokenType: '',
    userInfo: {},
    deleteUserInfo: () => { },
    addUserInfo: (userInfo) => { },
    addToken: (token, tokenType) => { },
    deleteToken: () => { },
}

const AuthenContext = React.createContext(DEFAULT_VALUE);

export function AuthenProvider({ children }) {
    const [isLogin, setIsLogin] = React.useState()
    const [token, setToken] = React.useState()
    const [tokenType, setTokenType] = React.useState()
    const [userInfo, setUserInfo] = React.useState()

    React.useLayoutEffect(() => {
        const token = JSON.parse(localStorage.getItem('loginToken'))
        const tokenType = JSON.parse(localStorage.getItem('tokenType'))
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (token && tokenType && userInfo) {
            setUserInfo(userInfo)
            setTokenType(tokenType)
            setToken(token)
            setIsLogin(true)
        } else {
            setTokenType('')
            setUserInfo({})
            setToken('')
            setIsLogin(false)
        }
    }, [])

    const handleSaveToken = (token, tokenType) => {
        localStorage.setItem('loginToken', JSON.stringify(token))
        localStorage.setItem('tokenType', JSON.stringify(tokenType))
        setToken(token)
        setTokenType(tokenType)
        setIsLogin(true)
    }

    const handleDeleteToken = () => {
        localStorage.removeItem('loginToken')
        localStorage.removeItem('tokenType')
        setToken('')
        setTokenType('')
        setIsLogin(false)
    }

    const handleAddUserInfo = (userInfoObj) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfoObj))
        setUserInfo(userInfoObj)
    }

    const handleDeleteUserInfo = () => {
        localStorage.removeItem('userInfo')
        setUserInfo({})
    }

    const value = {
        isLogin,
        token,
        tokenType,
        userInfo,
        addUserInfo: handleAddUserInfo,
        deleteUserInfo: handleDeleteUserInfo,
        addToken: handleSaveToken,
        deleteToken: handleDeleteToken,
    }

    return (<AuthenContext.Provider value={value}>{children}</AuthenContext.Provider>)
}

export default AuthenContext
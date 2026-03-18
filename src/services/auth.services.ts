interface LoginInput {
    username: string
    password: string
}

interface LoginResult {
    success: boolean
}

export async function loginService(
    data: LoginInput
): Promise<LoginResult> {
    // Logica

    if(data.username === "admin" && data.password === "admin"){
        return {success: true}
    }

    throw new Error("Credenciales inválidas")
}
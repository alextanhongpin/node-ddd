const Infra = require('./infrastructure')

async function main () {
  const infra = Infra()
  // const authRepository = await infra.createAuthRepository()
  const useCase = await infra.createAuthUseCase()
  {
    const email = 'john.doe@mail.com'
    const password = '12345678'
    try {
      const res = await useCase.register(email, password)
      console.log(res)
    } catch (err) {
      console.log(err.message, err.stack)
    }
  }
}

main().catch(console.error)

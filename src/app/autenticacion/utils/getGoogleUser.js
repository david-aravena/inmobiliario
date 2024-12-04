import {googleAuth, createUser} from 'app/serverless/utils/auth'
import {createItem, findItemId} from 'app/serverless/utils/db'

export const getGoogleUser = async () => {
  try {
    const result = await googleAuth();
    const user = await findItemId("users", result.user.uid)
    if(user){
      return user
    }else {
      const obj = {
        email: result.user.email,
        image: null,
        emailVerified: result.user.emailVerified,
        id: result.user.uid
      }
      return await createItem("users", obj)
    }
  }catch (error) {
    console.error("Error durante la autenticación con Google:", error);
  }
}

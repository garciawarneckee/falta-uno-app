import I18n from 'ex-react-native-i18n';

I18n.fallbacks = true
I18n.translations = {
  es: {
    app: {
      name: `Falta uno!`,
      slogan: `La app que no te deja tirado`,
    },
    login: {
      loginWithFacebook: `Ingresar con Facebook`,
      logging: `Ingresando...`,
      error: {
        auth: `Ocurrió un error al guardar la autorización.\nIntentá nuevamente más tarde`,
        user_cancelled: `Cancelaste el proceso.\nPara ingresar tenés que autorizar la aplicación.`,
      },
      success: `¡Proceso completado con éxito!`,
    } 
  }
}

export default I18n;

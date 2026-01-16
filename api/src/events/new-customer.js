// API: api/src/events/new-customer.js
const AuthorizationService = require('../services/authorization-service')
const EmailService = require('../services/email-service')

exports.handleEvent = async (redisClient, subscriberClient) => {
  await subscriberClient.subscribe('new-customer', async (message) => {
    try {
      const data = JSON.parse(message)

      const authorizationService = new AuthorizationService()
      // CORRECCIÓN: Usar 'activationUrl' consistente con el template
      const activationUrl = await authorizationService.createActivationToken(data.id, 'customer')

      const emailService = new EmailService('gmail')
      await emailService.sendEmail(
        data,
        'customer',
        'activationCustomer',  // Nombre del template
        { name: data.name, activationUrl }
      )
    } catch (error) {
      console.error('Error procesando mensaje:', error)
    }
  })
}

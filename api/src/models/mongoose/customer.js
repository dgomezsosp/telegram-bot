module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      email: String,
      birthDate: Date,
      deletedAt: Date
    },
    { timestamps: true }
  )

  const Customer = mongoose.model('Customer', schema, 'customers')
  return Customer
}

const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  scheduleTime: { type: String, required: true },
  email: { type: String, required: true },
  treatmentContent: {
    type: String,
    required: true,
    maxlength: [500, 'please explain briefly the ailment'],
  },
})

module.exports = mongoose.model('Service', ServiceSchema)

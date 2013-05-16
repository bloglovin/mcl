module.exports = {
  schema: {
    createdAt: {
      type: Date,
      required: true,
      index: true
    },
    user: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  methods: {},
  statics: {}
}
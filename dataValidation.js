const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/playground')
  .then(() => console.log('Connected to MongoDB....'))
  .catch((err) => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlenth: 255,
    // match:/pattern/
  },
  category: {
    type: String,
    enum: ['web', 'mobile,', 'network'],
    lowercase: true,
    // uppercase:true,
    // trim:true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      async: true,
      validator: function (v, callback) {
        //do
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag',
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    category: 'Web',
    author: 'Mosh',
    tags: ['frontend'],
    isPublished: true,
    price: 50.8,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

// createCourse();
async function getCourse(id) {
  // const pageNumber = 2;
  // const pageSize = 10;

  const courses = await Course.find({
    _id: id,
  })
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1, price: 1 });
  console.log(courses[0].price);
}
getCourse('6409ae133479ed34a1995b30');

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/playground')
  .then(() => console.log('Connected to MongoDB....'))
  .catch((err) => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}
async function getCourse() {
  // const pageNumber = 2;
  // const pageSize = 10;

  const courses = await Course.find({
    author: 'Mosh',
    isPublished: true,
  })
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   course.isPublished = true;
//   course.author = 'Another author';
//   // course.set({
//   //   isPublished: true,
//   //   author: 'Another name',
//   // });
//   const result = await course.save();
//   console.log(result);
// }

async function updateCourse(id) {
  // const result = await Course.updateOne(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: 'John',
  //       isPublished: false,
  //     },
  //   }
  // );
  //  console.log(result);

  // getting the document that was updated

//   const course = await Course.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         author: 'John Ablelionnel',
//         isPublished: true,
//       },
//     },
//     { new: true }
//   );
//   console.log(course);
// }

// updateCourse('64087b2d3b213188133d6a94');

async function removeCourse(id) {
//  const course= await Course.deleteOne({_id:id})

 const course= await Course.findByIdAndRemove(id)

}

removeCourse('64087b2d3b213188133d6a94');


// async function run() {
//   const courses = await getCourse();
//   console.log(courses);
// }
// run();

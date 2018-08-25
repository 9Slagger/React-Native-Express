// -----------
// var author = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: 'Jos',
//   age: 50
// });

// author.save(function (err) {
//   if (err) return handleError(err);
// });


// var story1 = new Story({
//   title: 'Casino Royale',
//   author: author._id
// });

// story1.save(function (err) {
//   if (err) return handleError(err);
// });


// Story.find({author: '5b8038153a436536e1e3579c'}).populate('author').exec(function (err, story) {
//   if (err) return handleError(err);
//   console.log(story[1]);
//   // prints "The author is Ian Fleming"
// });

// Queue.findOne({ author: '5b804bca0bd0d138fcb8a4b4' }).populate('author').exec(function (err, res) {
//   if (err) return handleError(err);
//   console.log(res);
// });

// User.findOneAndUpdate({ _id: '5b80e0432deec03fab726ffd' }, {'queues': '5b804f32ecdc07395e0ac258'}).exec(function (err, res) {
//   if (err) return handleError(err);
//   else console.log(res)
// })

// ---------- การค้นหาจากฝั่ง One
// User.findOne({ _id: '5b80e0432deec03fab726ffd' }).exec(function (err, res) {
//   if (err) return handleError(err);
//   else {
//     let temp = res.queues
//     Queue.find({_id: temp}).exec(function (err, data) {
//       if (err) return handleError(err);
//       else console.log(data)
//     })
//   }
// })